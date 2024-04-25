import { Button, Drawer, Space } from 'antd'
import React from 'react'

const SettingsPanel = ({placement, onClose, open}) => {
  return (
    <Drawer
        title="Theme Settings"
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
        
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
  )
}

export default SettingsPanel
