import * as _ from '../../../../node_modules/lodash/lodash.min'
import * as actions from '../../actions/action-types'

const initialReleaseRateState = {
    gasList: [],
    report: {},
    atexProjects: {}
}

const setReportLink = (originalState, url) => {
    const stateCopy = _.merge({}, originalState)
    stateCopy.report.url = url
    return stateCopy
}

const newProjectCreated = (state, action) => {
    const stateCopy = _.merge({}, state)
    stateCopy.atexProjects[action.projectId] = action.projectData
    return stateCopy
}

const projectDataFetched = (state, action) => {
    const stateCopy = _.merge({}, state)
    stateCopy.atexProjects[action.projectId] = action.projectData    
    return stateCopy
}

const releaseRate = (state = initialReleaseRateState, action) => {
    switch (action.type) {
        case actions.ATEX_FIELD_VALUE_UPDATED:
            // console.log('Field value updated', action)
            const stateCopy = _.merge({}, state)
            _.set(stateCopy.atexProjects[action.projectId].fields, action.fieldName, action.value)
            return stateCopy

        case actions.NEW_PROJECT_CREATED:
            return action.projectData.projectType !== 'atex' ? state : newProjectCreated(state, action)

        case actions.ATEX_PROJECT_DATA_FETCHED:
            return projectDataFetched(state, action)

        case actions.ATEX_ELEMENT_VALUE_UPDATED:
            const elementStateCopy = _.merge({}, state)
            const element = _.find(state.gasList, g => g.CASnr === action.value)
            const fields = elementStateCopy.atexProjects[action.projectId].fields
            fields.casNumber = action.value
            fields.releaseRate.lowerFlammableLimit = element.explosionLimit.volume.LFL
            fields.releaseRate.gasDensity = element.gasDensity
            fields.releaseRate.molarMass = element.molarMass
            
            return elementStateCopy

        case actions.ATEX_REPORT_LINK:
            return setReportLink(state, null)

        case actions.ATEX_REPORT_LINK_RECEIVED:
            return setReportLink(state, action.url)

        case actions.ELEMENTS_FETCHED: 
            return _.merge({}, state, { gasList: _.values(action.data) })
        default:
            return state
    }
}

export default releaseRate