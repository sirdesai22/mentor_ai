import DashLayout from '@/layout/DashLayout'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <DashLayout>
        {children}
    </DashLayout>
  ) 
}

export default DashboardLayout