/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const reimbursementRouter = {
  path: '/reimbursement',
  component: Layout,
  redirect: '/reimbursement/complex-table',
  name: 'Table',
  meta: {
    title: '驾驶员报销',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/reimbursement/dynamic-table/index'),
      name: 'DynamicTable',
      meta: { title: 'Dynamic Table' }
    },
    {
      path: 'drag-table',
      component: () => import('@/views/reimbursement/drag-table'),
      name: 'DragTable',
      meta: { title: 'Drag Table' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/reimbursement/inline-edit-table'),
      name: 'InlineEditTable',
      meta: { title: 'Inline Edit' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/reimbursement/complex-table'),
      name: 'ComplexTable',
      meta: { title: 'Complex Table' }
    },
    {
      path: 'reimbursement',
      component: () => import('@/views/reimbursement/reimbursement'),
      name: 'Reimbursement',
      meta: { title: 'reimbursement' }
    }
  ]
}
export default reimbursementRouter
