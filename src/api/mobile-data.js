import request from '@/utils/request'

export function apiGetScreenMobileData () {
  return request({
    url: '/screen/mobile',
    method: 'GET'
  })
}
