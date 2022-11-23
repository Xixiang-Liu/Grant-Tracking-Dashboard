import React, { useState, useEffect } from 'react';
import { handleQueryDB } from '../util/DataHelper'

export const Budget = () => {
    const [records, setRecords] = useState([]);
    const [budgetRecords, setBudgetRecords] = useState([]);
    const [programs, setPrograms] = useState([]);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedProgram, setSelectedProgram] = useState('');

    const queryData = async () => {
        try {
            const result = await handleQueryDB()
            console.log(result.data, 333)
            const tempPrograms = []
            const filteredData = result.data.filter(item => item.date)
            filteredData.forEach(item => {
                if (!tempPrograms.includes(item.program)) {
                    tempPrograms.push(item.program)
                }
            })
            setSelectedProgram(tempPrograms[0])
            setPrograms(tempPrograms)
            console.log({tempPrograms})
            setRecords(filteredData)
        } catch(e) {
            console.error(e)
        }
    }

    useEffect(() => {
        queryData()
      }, [])

    const handleQueryClick = () => {
        const currentProgram = []
        records.forEach(item => {
            console.log(new Date(item.date).toLocaleString(), endDate, new Date(item.date).toLocaleString() <= endDate)
            if (new Date(item.date) >= new Date(startDate) &&
            new Date(item.date) <= new Date(endDate) &&
            selectedProgram === item.program
            ) {
                currentProgram.push(item)
            }
        })  
        setBudgetRecords(currentProgram)
        console.log({startDate, endDate, selectedProgram})
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '2rem'
        }}>
            <h2>Budget</h2>
            <div>
                <input
                    type="date"
                    name="startDate"
                    placeholder="mm/dd/yyyy"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    />
                <input
                    type="date"
                    name="endDate"
                    placeholder="mm/dd/yyyy"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    />
                <select 
                    onChange={(event) => setSelectedProgram(event.target.value)}
                    value={selectedProgram}
                >
                    {
                        programs.map(program => (
                            <option value={program}>{program}</option>
                        ))
                    }
                </select>
                <button style={{width: '100px', marginLeft: '20px'}} onClick={handleQueryClick}>Query</button>
            </div>
            <div style={{ marginTop: '1rem' }}>
            
            <table>
            <thead>
                <tr>
                <th style={{border: '1px solid #000'}}>Date</th>
                <th style={{border: '1px solid #000'}}>Vendor</th>
                <th style={{border: '1px solid #000'}}>Amount</th>
                <th style={{border: '1px solid #000'}}>Category</th>
                <th style={{border: '1px solid #000'}}>Account</th>
                <th style={{border: '1px solid #000'}}>Program</th>
                <th style={{border: '1px solid #000'}}>Account Group</th>
                <th style={{border: '1px solid #000'}}>Budget</th>
                <th style={{border: '1px solid #000'}}>Description</th>
                </tr>
            </thead>
            <tbody>
                {budgetRecords.map((record) => (
                    <tr>
                        <td style={{border: '1px solid #ccc'}}>{new Date(record.date).toLocaleDateString() || record.date}</td>
                        <td style={{border: '1px solid #ccc'}}>{record.vendor}</td>
                        <td style={{border: '1px solid #ccc'}}>{record.amount}</td>
                        <td style={{border: '1px solid #ccc'}}>{record.category}</td>
                        <td style={{border: '1px solid #ccc'}}>{record.account}</td>
                        <td style={{border: '1px solid #ccc'}}>{record.program}</td>
                        <td style={{border: '1px solid #ccc'}}>{record.account_group}</td>
                        <td style={{border: '1px solid #ccc'}}>{record.budget}</td>
                        <td style={{border: '1px solid #ccc'}}>{record.description}</td>
                    </tr>
                ))}
            </tbody>
            </table>
            </div>
        </div>
    );
};
  


