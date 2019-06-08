import * as firebaseActions from '../firebase-actions'
import * as _ from '../../../../node_modules/lodash/lodash.min'
import * as actions from '../action-types'
import { flattenFields } from '../marshaller/marshaller'
import { newAtexTemplate } from './atex-template';


export const fieldValueUpdated = (fieldName, value, projectId) => dispatch => {
    dispatch({
        type: actions.ATEX_FIELD_VALUE_UPDATED,
        fieldName, value, projectId
    })
    dispatch(firebaseActions.updateAtexProjectDataField(projectId))
}

export const elementUpdated = (value, projectId) => {
    return {
        type: actions.ATEX_ELEMENT_VALUE_UPDATED,
        value, projectId
    }
}

export const resetReportLink = () => {
    return {
        type: actions.ATEX_REPORT_LINK
    }
}

export const submitReleaseRateCalculationRequest = atexProject => dispatch => {
    const fieldValues = atexProject.fields
    const performReleaseCalculation = fieldValues.calculateReleaseRate === 'yes'
    const isGasCalculation = fieldValues.liquidOrGas === 'gas'
    const hasReleaseRateInKgPerSecond = fieldValues.releaseRateInKgPerSecond === 'yes'
    const isEvaporationFromPool = fieldValues.poolLeakage === 'yes'
    const isIndoors = fieldValues.indoorOutdoor === 'indoors'

    const booleanCollection = {
        performReleaseCalculation,
        isGasCalculation,
        hasReleaseRateInKgPerSecond,
        isEvaporationFromPool,
        isIndoors
    }

    const properFields = _.merge({}, fieldValues, booleanCollection)
    atexProject.fields = properFields

    dispatch(firebaseActions.submitReleaseRateCalculation(atexProject))
}

export const createNewAtexProject = projectData => dispatch => {
    projectData.metadata = flattenFields(projectData.metadata)
    const project = _.merge({}, projectData, newAtexTemplate())
    dispatch(firebaseActions.saveNewProjectToDb(project, true))
}

export const fetchAtexProjectData = firebaseActions.fetchAtexProjectData

export const loadElements = firebaseActions.loadElements