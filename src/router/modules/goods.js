/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const goodsRouter = {
  path: '/goods',
  component: Layout,
  redirect: '/goods/goods',
  name: 'Table',
  meta: {
    title: '进出货',
    icon: 'table'
  },
  children: [
    {
      path: 'goods',
      component: () => import('@/views/goods/goods'),
      name: 'goods',
      meta: { title: '进出货' }
    },
    {
      path: 'purchase-analysis',
      component: () => import('@/views/goods/purchase-analysis'),
      name: 'purchase-analysis',
      meta: { title: '进货分析' }
    },
    {
      path: 'shipment-analysis',
      component: () => import('@/views/goods/shipment-analysis'),
      name: 'shipment-analysis',
      meta: { title: '出货分析' }
    }
  ]
}
export default goodsRouter
