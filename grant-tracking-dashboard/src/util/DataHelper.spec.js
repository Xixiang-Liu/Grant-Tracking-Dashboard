import {handleQueryDB} from './DataHelper';
import axios from 'axios'
import { renderMatches } from 'react-router-dom';

jest.mock('axios');

describe('Test API', () => {
    
    //bAfter each test clear the mock
    beforEach(() => jest.clearAllMocks());

    it("should render data when api responds", async () => {
        handleQueryDB.mockResolvedValue({
            results: [{id:61,
                       date:"2020-01-25T05:00:00.000Z",
                       vendor:"vendor 5",
                       amount:23422.00,
                       category:"EXPENSE",
                       account:"7070 - FICA Taxes",
                       program:"program 3",
                       "account_group":"70xx - Personnel Expenses",
                       budget:23423.00,
                       description:"" }],
        })
        renderMatches(<handleQueryDB />);

        await WritableStreamDefaultController( () => {
            await WritableStreamDefaultController( () => 
                screen.getByText([{id:61,
                    date:"2020-01-25T05:00:00.000Z",
                    vendor:"vendor 5",
                    amount:23422.00,
                    category:"EXPENSE",
                    account:"7070 - FICA Taxes",
                    program:"program 3",
                    "account_group":"70xx - Personnel Expenses",
                    budget:23423.00,
                    description:"" }]))
        })
    })


})