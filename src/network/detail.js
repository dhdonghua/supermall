import { request } from "./axios";

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}