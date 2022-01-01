import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import differenceBy from 'lodash/differenceBy';
const columns = [
        {
            name: 'Name',
            selector: row => row.displayName,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: 'Age',
            selector: row => row.age,
            sortable: true,
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true,
        },
    ];

const User = () => {
    const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);
    const [data, setData] = useState({});

    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);
    };

    useEffect(()=>{
        fetch(`https://afternoon-garden-42898.herokuapp.com/user`)
        .then(res => res.json())
        .then(data => {
            setData(data);
        });
    },[])

    

	const handleDelete = () => {
			
        if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.email)}?`)) {
            setToggleCleared(!toggleCleared);
            setData(differenceBy(data, selectedRows, 'title'));
        }
    };

    return (
        <div>
            <Button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }} icon>
				Delete
			</Button>
            <DataTable
                title="User"
                columns={columns}
                data={data}
                selectableRows
                onSelectedRowsChange={handleChange}
            />
        </div>
    );
};

export default User;