import { Link } from "wouter";
import { Table, Button } from 'nhsuk-react-components';
import React from 'react';

const workbookRow = (workbook) => {
  const id = `/admin/analytics/workbook/${workbook._id}`
  let name;
  if(workbook.disease === null){
    name = "no disease name"
  } else {
    name = workbook.disease.name
  }
  return (
    <Table.Row key={id}>
      <Table.Cell>{workbook.title}</Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>
        <Link to={id}>
          <Button style={{margin: 0}}>Analytics</Button>
        </Link>
      </Table.Cell>
    </Table.Row>
  )
}


const RenderTable = ({workbooks}) => {
  return (
    <Table.Panel heading="Workbooks">
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>Disease</Table.Cell>
            <Table.Cell />
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {workbooks.map(workbook => workbookRow(workbook))}
        </Table.Body>
      </Table>
    </Table.Panel>      
  )
}

export default RenderTable;