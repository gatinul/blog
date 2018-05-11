'use strict';
const rp = require('request-promise');
const axios = require('axios');

module.exports = app => {
  class miniController extends app.Controller {
    async middleApi(ctx) {
      const result = {
        success: false,
        message: '',
      };
      const url = ctx.request.body.url;
      console.log(url);
      const res = await this.fetch(url, ctx.request.body);
      if (res.success) {
        result.success = true;
        result.message = res.message;
      } else {
        result.message = '请求失败';
        // 以后另分一个小程序专用日志
        this.logger.error('*****小程序：' + res.message + '*****');
      }
      ctx.body = result;
    }
    async getAccessToken(ctx) {
      const accessToken = await this.fetch('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx3ae282ed1304c5b2&secret=fa274024b22f7a3beafffd08a1bdf51e');
      ctx.body = accessToken;
    }
    async getSessionKey(ctx) {
      const code = ctx.request.body.code;
      const sessionKey = await this.fetch('https://api.weixin.qq.com/sns/jscode2session?appid=wx3ae282ed1304c5b2&secret=fa274024b22f7a3beafffd08a1bdf51e&js_code=' + code + '&grant_type=authorization_code');
      ctx.body = sessionKey;
    }
    async ableQueryByLoginName(ctx) {
      const body = ctx.request.body;
      console.log(body);
      const result = {
        success: false,
        message: '',
      };
      const url = 'http://218.25.255.9/ableperson/ablePerson/queryAblePersons';
      let res;
      if (body.type === 'staff') {
        res = await this.axios(url, {
          staffId: body.staffId,
          // staffId: 'admin',
        });
        // console.log(res.data);
        if (res.data.RESP_CODE === '0000') {
          result.success = true;
          result.message = res.data.obj.list;
        } else {
          result.message = res.data.RESP_DESC;
        }
      } else {
        res = await this.axios(url, {
          serialNumber: body.phone,
          // serialNumber: '186000000002',
        });
        console.log(res.data);
        if (res.data.RESP_CODE === '0000') {
          result.success = true;
          result.message = res.data.obj.list;
        } else {
          result.message = res.data.RESP_DESC;
        }
      }
      // console.log(res.data);
      ctx.body = result;
    }
    async ableQrcBind(ctx) {
      const result = {
        success: false,
        message: '',
      };
      const body = ctx.request.body;
      const first_url = 'http://218.25.255.9/ableperson/ablePerson/queryAblePersons';
      const res = await this.axios(first_url, {
        staffId: body.staffId,
      });
      console.log(res.data);
      if (res.data.RESP_CODE === '0000') {
        const second_url = 'http://218.25.255.9/pcenterew/ableman/ablemanAQrc/saveAbleManAandQrc.do';
        const res2 = await this.fetch(second_url, {
          ablemanAId: res.data.obj.list[0].id,
          qrcAId: body.qrcId,
        });
        const res2Data = JSON.parse(res2.message);
        console.log(res2Data);
        if (res2Data.resp_code === '00') {
          result.success = true;
        } else {
          result.message = res2Data.resp_desc;
          this.logger.error('*****  [fanbq]' + result.message + '*****');
        }
      } else {
        result.message = res.RESP_DESC;
        this.logger.error('*****  [songlj]' + result.message + '*****');
      }
      ctx.body = result;
    }
    async ableQuerySecond(ctx) {
      const body = ctx.request.body;
      const result = {
        success: false,
        message: '',
      };
      const url = 'http://218.25.255.9/ableperson/ablePerson/qryChildStaffInfos';
      const res = await this.axios(url, {
        staffId: body.staffId,
      });
      if (res.data.RESP_CODE === '0000') {
        result.success = true;
        console.log('***' + res.data.obj.list + '****');
        const wty_url = 'http://218.25.255.9/ableperson/ablePersonOrder/queryAblePersonOrderCount';
        for (const item of res.data.obj.list) {
          const arr = [];
          arr.push(item.id);
          const res2 = await this.axios(wty_url, {
            ableperson_id: arr,
          });
          if (res2.data.RESP_CODE === '0000') {
            item.total = res2.data.obj.list[0].NUM_COUNT;
            item.lastOrder = res2.data.obj.list[0].LAST_TIME;
          }
        }
        result.message = res.data.obj.list;
      } else {
        result.message = res.data.RESP_DESC;
      }
      ctx.body = result;
    }
    async ableQueryReviewing(ctx) {
      const body = ctx.request.body;
      // console.log(body);
      const result = {
        success: false,
        message: '',
      };
      const url = 'http://218.25.255.9/ableperson/ablePersonApply/queryAblePersonApplys';
      // const url = 'http://132.194.41.211:20660/ablePersonServer/ablePersonApply/queryAblePersonApplys';
      const res = await this.axios(url, {
        staffId: body.staffId,
        status: body.status,
      });
      if (!res.data) {
        result.message = '请求失败';
      } else {
        if (res.data.RESP_CODE === '0000') {
          result.success = true;
          result.message = res.data.obj.list;
        } else {
          result.message = res.data.RESP_DESC;
        }
      }
      ctx.body = result;
    }
    async ableRejectSecond(ctx) {
      const body = ctx.request.body;
      console.log(body);
      const result = {
        success: false,
        message: '',
      };
      const url = 'http://218.25.255.9/ableperson/ablePersonApply/auditApplyInfo';
      const res = await this.axios(url, {
        id: body.id,
        status: body.status,
        remark: body.remark,
        applyType: body.applyType,
        saleType: body.saleType,
        serialNumber: body.serialNumber,
      });
      let aAbleId = '';
      if (!res.data) {
        result.message = '请求失败';
      } else {
        if (res.data.RESP_CODE === '0000') {
          this.fetch('http://218.25.255.9/chbb/e10010/online/utils/sendCommonMsg.do', {
            phone: body.serialNumber,
            content: '【能人中心】 您的能人申请有新的动态，请点击 http://218.25.255.9/chbb/e10010/online/ableRateQry.do?phone= ' + body.serialNumber,
          });
          if (body.status === '1') {
            console.log(res.data.obj);
            aAbleId = body.aAbleId;
            const qrId = res.data.obj.qrId;
            const bAbleId = res.data.obj.id;
            const fan_url = 'http://218.25.255.9/pcenterew/ableman/ablemanBQrc/saveAbleManBandQrc.do?';
            const res3 = await this.fetch(fan_url, {
              ablemanAId: aAbleId,
              ablemanBId: bAbleId,
              ablemanBName: body.staffName,
              qrcAId: qrId,
            });
            const res3Data = JSON.parse(res3.message);
            console.log(res3Data);
            if (res3Data.resp_code === '00') {
              result.success = true;
            } else {
              result.message = result.resp_desc;
            }
          } else {
            result.success = true;
          }
        } else {
          result.message = res.data.RESP_DESC;
        }
      }
      ctx.body = result;
    }
    async ableQueryOrder(ctx) {
      const body = ctx.request.body;
      const result = {
        success: false,
        message: '',
      };
      const url = 'http://218.25.255.9/ableperson/ablePersonOrder/queryAblePersonOrderDetail';
      const res = await this.axios(url, {
        ableperson_id: body.ableId,
        startDate: body.startDate,
        endDate: body.endDate,
      });
      if (!res.data) {
        result.message = '请求失败';
      } else {
        if (res.data.RESP_CODE === '0000') {
          result.success = true;
          result.message = res.data.obj.list;
        } else {
          result.message = res.data.RESP_DESC;
        }
      }
      ctx.body = result;
    }
    async ableGetAQrcByAbleId(ctx) {
      const body = ctx.request.body;
      console.log(body);
      const result = {
        success: false,
        message: '',
      };
      const url = 'http://218.25.255.9/pcenterew/ableman/ablemanAQrc/getQrcInfo.do';
      const res = await this.fetch(url, {
        ablemanAId: body.ableId,
      });
      const resData = JSON.parse(res.message);
      console.log(resData);
      if (resData.resp_code === '00') {
        result.success = true;
        result.message = resData.qrcInfoList;
      } else {
        result.message = result.resp_desc;
      }
      ctx.body = result;
    }
    async ableQueryQrcByBAbleId(ctx) {
      const body = ctx.request.body;
      // console.log(body);
      const result = {
        success: false,
        message: '',
      };
      const url = 'http://218.25.255.9/pcenterew/ableman/ablemanBQrc/getAbleManQrcInfo.do';
      const res = await this.fetch(url, {
        ablemanBId: body.ableId,
      });
      const resData = JSON.parse(res.message);
      console.log(resData);
      if (resData.resp_code === '00') {
        if (resData.resp_info.bList.length > 0) {
          result.success = true;
          // result.message = resData.qrcInfoList;
          result.message = resData.resp_info.bList[0].qrcBId;
        } else {
          result.message = '自动重新调取';
        }
      } else {
        result.message = result.resp_desc;
      }
      ctx.body = result;
    }
    async retryBindABQrc(ctx) {
      const body = ctx.request.body;
      console.log(body);
      const result = {
        success: false,
        message: '',
      };
      const a_url = 'http://218.25.255.9/pcenterew/ableman/ablemanAQrc/getAbleManAInfoByQrcAId.do';
      const a_res = await this.fetch(a_url, {
        qrcAId: body.qrcAId,
      });
      const resaData = JSON.parse(a_res.message);
      console.log(11);
      console.log(resaData.resp_desc[0].ablemanAId);
      if (resaData.resp_code === '00') {
        const fan_url = 'http://218.25.255.9/pcenterew/ableman/ablemanBQrc/saveAbleManBandQrc.do';
        const res3 = await this.fetch(fan_url, {
          ablemanAId: resaData.resp_desc[0].ablemanAId,
          ablemanBId: body.ablemanBId,
          ablemanBName: body.ablemanBName,
          qrcAId: body.qrcAId,
        });
        console.log(res3);
        const res3Data = JSON.parse(res3.message);
        console.log(res3Data);
        if (res3Data.resp_code === '00') {
          result.success = true;
        } else {
          result.message = res3Data.resp_desc;
        }
      } else {
        result.message = '重新调取失败';
      }
      ctx.body = result;
    }
    async fetch(path, data) {
      return new Promise(function(resolve) {
        const options = {
          method: 'POST',
          uri: path,
          formData: data,
        };
        rp(options)
          .then(function(body) {
            resolve({
              success: true,
              message: body,
            });
          })
          .catch(function(err) {
            resolve({
              success: false,
              message: err,
            });
          });
      });
    }
    async axios(path, data) {
      return new Promise(function(resolve) {
        axios.post(path, JSON.stringify(data))
          .then(function(response) {
            resolve(response);
          })
          .catch(function(error) {
            resolve(error);
          });
      });
    }
  }
  return miniController;
};

