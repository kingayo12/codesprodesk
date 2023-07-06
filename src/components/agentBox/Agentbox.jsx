import React from 'react'
import agentdata from '../../assets/data/agentdata.json'
import TickLink from '../ticketnav/TickLink'
import { Person2Outlined } from '@mui/icons-material'

const Agentbox = () => {
  return (
    <div className="agent-box-contrainer">
        <div className="agent-profile">
            <div className="header text-color2">Agent Details</div>
            <div className="agent-pic">
              <div className="pics rounded-full flex items-center justify-center">
                  <Person2Outlined className=' text-3xl icon-color'/>
              </div>
              <p className=' text-sm capitalize'>adewumi Ayomide Oreoluwa</p>
              <div className="tel text-sm text-slate-400">
                +2356790876
              </div>
              <div className="mailadress text-sm text-slate-400">
                Oreoluwaa08@gmail.com
              </div>
            </div>
            <div className="box mt-10">
              <div className="box-header">
                <p className='text-color2'>Active Agents</p>
                <div className="rund rounded-full"></div>
              </div>
              <div className="trest">
              <TickLink/>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Agentbox