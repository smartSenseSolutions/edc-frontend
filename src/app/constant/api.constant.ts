import { environment } from 'src/environments/environment';

const EDC1_BASE_URL = environment.edc1ApiBaseUrl;
const EDC2_BASE_URL = environment.edc2ApiBaseUrl;
const EDC3_BASE_URL = environment.edc3ApiBaseUrl;
const EDC4_BASE_URL = environment.edc4ApiBaseUrl;

const EDC1_TRACE_URL = environment.edc1TraceUrl + 'api/';
const EDC2_TRACE_URL = environment.edc2TraceUrl + 'api/';
const EDC3_TRACE_URL = environment.edc3TraceUrl + 'api/';
const EDC4_TRACE_URL = environment.edc4TraceUrl + 'api/';

const EDC1_DATA_URL = EDC1_BASE_URL + 'data/';
const EDC2_DATA_URL = EDC2_BASE_URL + 'data/';
const EDC3_DATA_URL = EDC3_BASE_URL + 'data/';
const EDC4_DATA_URL = EDC4_BASE_URL + 'data/';

export const API = {
  EDC1: {
    IDS_URL: EDC1_BASE_URL + 'BPNL00000003CML1/api/v1/ids/data',
    CREATE_ASSET: EDC1_DATA_URL + 'assets',
    POLICY_DEF: EDC1_DATA_URL + 'policydefinitions',
    CONTRACT_DEF: EDC1_DATA_URL + 'contractdefinitions',
    GET_CATALOG: EDC1_DATA_URL + 'catalog',
    START_NEGOTIATION: EDC1_DATA_URL + 'contractnegotiations',
    CONTRACT_NEGOTIATION: EDC1_DATA_URL + 'contractnegotiations/:id',
    TRANSFER_PROCESS: EDC1_DATA_URL + 'transferprocess',
    // GET_DATA: EDC1_TRACE_URL + 'investigations',
    GET_SENT_DATA: EDC1_TRACE_URL + 'sent/data/list',
    GET_RECEIVED_DATA: EDC1_TRACE_URL + 'received/data/list',
    // GET_PARTS: EDC1_TRACE_URL + 'test/assets',
    CREATE_DATA: EDC1_TRACE_URL + 'create/data',
    TRANSFER_DATA: EDC1_TRACE_URL + 'init/transfer/process',
  },
  EDC2: {
    IDS_URL: EDC2_BASE_URL + 'BPNL00000003CML1/api/v1/ids/data',
    CREATE_ASSET: EDC2_DATA_URL + 'assets',
    POLICY_DEF: EDC2_DATA_URL + 'policydefinitions',
    CONTRACT_DEF: EDC2_DATA_URL + 'contractdefinitions',
    GET_CATALOG: EDC2_DATA_URL + 'catalog',
    START_NEGOTIATION: EDC2_DATA_URL + 'contractnegotiations',
    CONTRACT_NEGOTIATION: EDC2_DATA_URL + 'contractnegotiations/:id',
    TRANSFER_PROCESS: EDC2_DATA_URL + 'transferprocess',
    // GET_DATA: EDC2_TRACE_URL + 'investigations',
    GET_SENT_DATA: EDC2_TRACE_URL + 'sent/data/list',
    GET_RECEIVED_DATA: EDC2_TRACE_URL + 'received/data/list',
    // GET_PARTS: EDC2_TRACE_URL + 'test/assets',
    CREATE_DATA: EDC2_TRACE_URL + 'create/data',
    TRANSFER_DATA: EDC2_TRACE_URL + 'init/transfer/process',
  },
  EDC3: {
    IDS_URL: EDC3_BASE_URL + 'BPNL00000003CML1/api/v1/ids/data',
    CREATE_ASSET: EDC3_DATA_URL + 'assets',
    POLICY_DEF: EDC3_DATA_URL + 'policydefinitions',
    CONTRACT_DEF: EDC3_DATA_URL + 'contractdefinitions',
    GET_CATALOG: EDC3_DATA_URL + 'catalog',
    START_NEGOTIATION: EDC3_DATA_URL + 'contractnegotiations',
    CONTRACT_NEGOTIATION: EDC3_DATA_URL + 'contractnegotiations/:id',
    TRANSFER_PROCESS: EDC3_DATA_URL + 'transferprocess',
    GET_DATA: EDC3_TRACE_URL + 'investigations',
    GET_PARTS: EDC3_TRACE_URL + 'test/assets',
    CREATE_DATA: EDC3_TRACE_URL + 'test/investigation',
  },
  EDC4: {
    IDS_URL: EDC4_BASE_URL + 'BPNL00000003CML1/api/v1/ids/data',
    CREATE_ASSET: EDC4_DATA_URL + 'assets',
    POLICY_DEF: EDC4_DATA_URL + 'policydefinitions',
    CONTRACT_DEF: EDC4_DATA_URL + 'contractdefinitions',
    GET_CATALOG: EDC4_DATA_URL + 'catalog',
    START_NEGOTIATION: EDC4_DATA_URL + 'contractnegotiations',
    CONTRACT_NEGOTIATION: EDC4_DATA_URL + 'contractnegotiations/:id',
    TRANSFER_PROCESS: EDC4_DATA_URL + 'transferprocess',
    GET_DATA: EDC4_TRACE_URL + 'investigations',
    GET_PARTS: EDC4_TRACE_URL + 'test/assets',
    CREATE_DATA: EDC4_TRACE_URL + 'test/investigation',
  },
};
