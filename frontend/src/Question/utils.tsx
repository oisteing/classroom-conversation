import {
  Graph,
  Node,
  Choice,
  Choices,
  Response,
  Responses,
  Illustration,
} from '../types'
import { NODE_SHAPE } from '../const'


export const buildConversation = (id: string, graph: Graph) => {
  const allChoices: Choices = graph.choices
  const allResponses: Responses = graph.responses

  const choice: Choice = allChoices[id]
  const randomResponse: Response = allResponses[choice.selectedResponse]
  
  const linkedResponses: Response[] = []
  randomResponse?.links.filter((link: Node) => link.shape === NODE_SHAPE.RESPONSE).forEach((response: Node) => linkedResponses.push(allResponses[response.id]))

  const illustrations: Illustration[] = getAllIllustrations(choice, randomResponse, linkedResponses)

  return { choice, randomResponse, linkedResponses, illustrations }
}

export const getAllChoices = (choice: Choice, randomResponse: Response, linkedResponses: Response[], graph: Graph) => {
  let choices: Choice[] = []
  
  const getLinkedChoices = (links: Node[]) => {
    if (!links) return []
    return links
      .filter((link: Node) => [NODE_SHAPE.CHOICE, NODE_SHAPE.ILLUSTRATION_CHOICE].includes(link.shape))
      .map((link: Node) => graph.choices[link.id])
  }

  const choiceLinks = getLinkedChoices(choice.responses)
  const responseLinks = getLinkedChoices(randomResponse?.links)
  let linkedResponseLinks: Choice[] = []
  linkedResponses.forEach((linkedResponse: Response) => {
    linkedResponseLinks = linkedResponseLinks.concat(getLinkedChoices(linkedResponse.links))
  })

  // TODO: filter duplicates
  choices = choices.concat(choiceLinks, responseLinks, linkedResponseLinks)

  return choices ?? []
}

export const getAllIllustrations = (choice: Choice, randomResponse: Response, linkedResponses: Response[]) => {
  let illustrations: Illustration[] = choice.illustrations ?? []

  // Get illustrations linked to the response
  randomResponse?.illustrations?.forEach((illustration: Illustration) => {
    // avoid duplicates
    if (illustrations.filter((_choosableIllustration) => _choosableIllustration.id === illustration.id).length < 1) illustrations.push(illustration)
  })
  // Get choosable illustrations linked to the linked responses
  linkedResponses?.forEach((linkedResponse: Response) => {
    linkedResponse.illustrations?.forEach((illustration: Illustration) => {
      if (illustrations.filter((_illustration) => _illustration.id === illustration.id).length < 1) illustrations.push(illustration)
    })
  })

  return illustrations
}
