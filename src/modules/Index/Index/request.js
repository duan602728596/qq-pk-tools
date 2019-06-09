import modianQuerySign from '@48/modian-query-sign';
const querystring = global.require('querystring');

/**
 * 请求摩点的项目信息
 * @param { string } pro_id: 项目id
 */
export function requestModianInformation(pro_id) {
  const body = { pro_id };
  const sign = modianQuerySign(body);

  return fetch('https://wds.modian.com/api/project/detail', {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({ ...body, sign })
  });
}

/**
 * 请求摩点的订单
 * @param { string } pro_id: 项目id
 * @param { number } page: 分页
 */
export function requestModianOrders(pro_id, page = 1) {
  const body = { page, pro_id, sort_by: 1 };
  const sign = modianQuerySign(body);

  return fetch('https://wds.modian.com/api/project/sorted_orders', {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({ ...body, sign })
  });
}