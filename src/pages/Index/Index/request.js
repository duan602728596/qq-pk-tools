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
 * 请求摩点的项目信息
 * @param { string } modianId: 项目id
 */
export async function requestModianInformationNoIdol(modianId) {
  const res = await fetch('https://sapi.modian.com/v45/main/productInfo', {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    body: `pro_id=${ modianId }`
  });
  const { data } = await res.json();
  const info = data.product_info;

  return {
    title: info.name,                  // 标题
    already_raised: info.backer_money, // 已打赏金额
    goal: info.install_money,          // 目标
    backer_count: info.backer_count,   // 集资人数
    end_time: info.end_time,           // 结束时间
    moxiId: info.moxi_post_id
  };
}