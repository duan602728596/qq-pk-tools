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