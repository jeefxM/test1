import React, { useState } from 'react'
import { Table } from '@geist-ui/core'
import { Button } from '../ui/button'
import { deleteGateConfiguration } from '@/pages/api/shopifyadminJeefx'
const DiscountsTable = ({allGates, setGatesState, gatesState}) => {
    
    const deleteGatesData = (id) => {
      const newGate = gatesState.filter(item => item.id !== id)
      setGatesState(newGate)
      deleteGateConfiguration({input:{id:id}})

      
    }

    const gateData = allGates.data.gateConfigurations.nodes.map(gate => {
      let requirements = null;
      let reaction = null;
      if (gate.requirements) {
          requirements = JSON.parse(gate.requirements.value);
      }
    
      // check if reaction field contains valid JSON syntax
      if (gate.reaction) {
          reaction = JSON.parse(gate.reaction.value);
       
      }
    
      return {Gate: gate?.name, Perk: reaction?.discount.type, Token:requirements?.conditions[0].contractAddress, Products: gate.subjectBindings.nodes.length, Delete:<Button variant='outline' onClick={() => deleteGatesData(gate.id)} className='bg-red text-white border-white'>Delete</Button>}
    })
  return (
    <div>
<Table data={gateData}>
      <Table.Column prop="Gate" label="Gate Name" />
      <Table.Column prop="Perk" label="Perk" />
      <Table.Column prop="Token" label="Token Address" />
      <Table.Column prop="Products" label="Products" />
      <Table.Column prop="Delete" label="" /> 
    </Table>
      
    </div>
  )
}

export default DiscountsTable
