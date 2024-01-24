import {squealRead_t} from '../schema/squealValidators'

const isPopular = (squeal : squealRead_t) : boolean => {
  const CM = squeal.impressions * 0.25
  return (squeal.positive_reaction > CM)
}

const isRiskUnpopular = (squeal : squealRead_t) : boolean => {
  // è a rischio impopolarità se aggiungendo un 10% di voti negativi è impopolare
  const impressions = squeal.impressions * 1.10
  const negative_reactions = squeal.negative_reaction * 1.10

  const CM = impressions * 0.25

  return (negative_reactions > CM)
}

const isRiskControversial = (squeal : squealRead_t) : boolean => {
  return isPopular(squeal) && isRiskUnpopular(squeal)
}

export { isPopular, isRiskUnpopular, isRiskControversial }
