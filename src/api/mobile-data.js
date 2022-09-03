import request from '@/utils/requests'

export function apiGetScreenMobileData () {
  return request({
    url: '/screen/mobile',
    method: 'GET'
  })
}
