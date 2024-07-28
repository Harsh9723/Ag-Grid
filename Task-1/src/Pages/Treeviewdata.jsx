import React from 'react'
import TreeView from '../Components/Treeview'
import companydata from '../CompanyData.json'

function Treeviewdata() {
  return (
    <div>
        <TreeView data={companydata} />
    </div>
  )
}

export default Treeviewdata