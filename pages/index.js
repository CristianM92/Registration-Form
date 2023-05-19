import React, { useState, setState} from 'react';

import {database} from '../firebase'
import {ref,push,child,update} from "firebase/database";

import Select from 'react-select';

export default function Home() {

    const [frmName, setName] = useState(null);
    const [frmAccess, setAccess] = useState(null);
    const [frmPurpose, setPurpose] = useState(null);
    const [frmMode,setMode] = useState(null);
    const [frmReference,setReference] = useState(null);
    const [frmLimit,setLimit] = useState(null);
    const [frmContext,setContext] = useState(null);
    const [frmSources,setSources] = useState(null);

    const handleInputChange = (e) => {
        const {id, value} = e.target;
        if(id === "frmName"){
            setName(value);
        }
        if(id === "frmAccess"){
            setAccess(value);
        }
        if(id === "frmPurpose"){
            setPurpose(value);
        }
        if(id === "frmMode"){
            setMode(value);
        }
        if(id === "frmReference"){
            setReference(value);
        }
        if(id === "frmLimit"){
          setLimit(value);
      }
      if(id === "frmContext"){
          setContext(value);
      }
      if(id === "frmSources"){
          setSources(value);
      }

    }

    const handleSubmit  = () => {
        console.log(frmName, frmAccess, frmPurpose, frmMode, frmReference, frmLimit, frmContext, frmSources);
      let obj = {
        frmName:frmName,
        frmAccess:frmAccess,
        frmPurpose:frmPurpose,
        frmMode:frmReference,
        frmLimit:frmLimit,
        frmContext:frmContext,
        frmSources:frmSources,
      }       
      const newPostKey = push(child(ref(database), 'posts')).key;
      const updates = {};
      updates['/' + newPostKey] = obj
      return update(ref(database), updates);
    }

  return (
    <form className="container">
      <h4>General</h4>

      <div className="name block">
        <label className="frm-name" for="frmName">Name</label> 
        <input
          id="frmName"
          value={frmName} onChange = {(e) => handleInputChange(e)}
          type="name"
          name="name"
          placeholder='Active input text'
          autoComplete="name"
          required
        />
      </div>

      <div className="context block">
        <div>
          <label className="frm-access" for="frmAccess">Access</label>
          <select 
            name="access" 
            id="frmAccess" 
            value={frmAccess} onChange = {(e) => handleInputChange(e)}
            type="text"
            autoComplete="given-access"
            >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div>
          <label className="frm-last" for="frmPurpose">Purpose</label>
          <select 
            name="purpose" 
            id="frmPurpose" 
            value={frmPurpose} onChange = {(e) => handleInputChange(e)}
            type="text"
            autoComplete="given-purpose"
            >
            <option value="purpose">Support Agent</option>
          </select>
        </div>
      </div>

      <div className="context block">
        <div>
          <label className="frm-mode" for="frmMode">Mode</label>
          <select 
            name="mode" 
            id="frmMode" 
            value={frmMode} onChange = {(e) => handleInputChange(e)}
            type="text"
            autoComplete="given-mode"
            >
            <option value="mode">Email</option>
            <option value="mode">Chat</option>
            <option value="mode">Call</option>
          </select>

        </div>
        <div>
          <label className="frm-reference" for="frmReference">Reference</label>
          <select 
            name="reference" 
            id="frmReference" 
            value={frmReference} onChange = {(e) => handleInputChange(e)}
            type="text"
            >
            <option value="reference">Include as link</option>
          </select>
        </div>
      </div>

      <div className="context block">
        <div>
          <label className="frm-limit" for="frmLimit">Limit</label>
          <input
            id="frmLimit"
            value={frmLimit} onChange = {(e) => handleInputChange(e)}
            type="text"
            name="limit"
            placeholder='10'
            required
          />
        </div>
        <div>
          <label className="frm-context" for="frmContext">Context</label>
          <select 
            name="context" 
            id="frmContext" 
            value={frmContext} onChange = {(e) => handleInputChange(e)}
            type="text"
           >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>

      <div className="block sources">
        <label className="frm-sources" for="frmSources">Sources</label>
        <select  
          name="sources" 
          id="frmSources" 
          value={frmSources} onChange = {(e) => handleInputChange(e)}
          type="text"
          isMulti
          >
          <option value="source1">Source1</option>
          <option value="source2">Source2</option>
          <option value="source2">Source3</option>
          <option value="source2">Source4</option>
          <option value="source2">Source5</option>
        </select>
      </div>

      <div className="button block">
        <button onClick={()=>handleSubmit()} type="save">Save</button>
      </div>
    </form>
  );
}