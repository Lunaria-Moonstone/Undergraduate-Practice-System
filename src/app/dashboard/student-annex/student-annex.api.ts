import { AnnexHistories } from "@/global/type";
import axios from "axios";

export default {
  async fetchAnnex() {
    // let resume = "R0lGODlhqASoAfcAAAAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBVZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDVmQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMrzDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YrAGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaqM2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmAmZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9VM/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//VZv/Vmf/VzP/VAP//M///Zv//mf//zP///wAAAAAAAAAAAAAAACH5BAEAAPwALAAAAACoBKgBAAitAPcJHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzps2bOHPq3Mmzp8+fQIMKHUq0qNGjSJMqXcq0qdOnUKNKnUq1qtWrWLNq3cq1q9evYMOKHUu2rNmzaNOqXcu2rdu3cOPKnUu3rt27ePPq3cu3r9+/gAMLHky4sOHDiBMrXsy4sePHkCNLnky5suXLmDNIa97MubPnz6BDix5NurTp06hTq17NurXr17Bjy55Nu7bt27hz697Nu7fv38CDCx9OvLjx48iTK1/OvLnz59CjS59Ovbr169izOGvfzr279+/gw4sfT768+fPo06tfz769+/fw48ufT7++/fv48+vfz7+///8ABijggAQWaOCBCCaoNeCCDDbo4IMQRijhhBRWaOGFGGao4YYcdujhhyCGKOKIJJZo4okopqjiiiy26OKLMMYo44w0LdZo44045qjjjjz26OOPQAYp5JBEFmnkkUgmqeSSTDbp5JNQRinllFRWaeWVWClmqeWWXHbp5ZdghinmmGSWaeaZaKap5ppstunmm3DGKeecdNZp55145iep55589unnn4AGKuighBZq6KGIJqrooow26uijkEYq6aSUVmrppZgjZqrpppx26umnoIYq6qiklmrqqaimquqqrLbq6quwxirrrLQg1mrrrbjmquuuvPbq66/ABivssMQWa+yxyCar7LLMNusg7LPQRivttNRWa+212Gar7bbcduvtt+CGK+645JZr7rke6Kar7rrstuvuu/DGK++89NZr77345qvvvvz26++/HAAHLPDABBds8MEIJ6zwwgw37PDDEEcs8cQUV2wc8cUYZ6zxxhx37PHHIIcs8sgkl2zyySinrPLKLBq37PLLMMcs88w012zzzTjnrPPOPPfs889ABxkt9NBEF2300UgnrfTSTDft9NNQRy311FRXGW311VhnrfXWXHft9ddghy322GSXbfbZaKcYrfbabLft9ttwxy333HTXbffdeOet9958Fvft99+ABy744IQXbvjhiCeu+OKMN+4X+OOQRy755JRXbvnlmGeu+eacd+7556AWhy766KSXbvrpqKeu+uqst+7667DHLhb77LTXbvvtuOeu++689+7778AHL/zwFMQXb/zxyCev/PLMN+/889BHL/30FNRXb/312Gev/fbcd+/99+CHL/74FOSXb/756Kev/vrst+/++/DHL//8FPTXb//9+Oev//789+///wAMoAAHFUjAAhrwgAhMoAIXyMAGOvCBEIygBBQnSMEKWvCCGMygBjfIwQ568IMgDBWhCEdIwhKa8IQoTKEKV8jCFrrwhTATjKEMZ0jDGtrwhjjMoQ53yMMe+hXwh0AMohCHSMQiGvGISEyiEpfIxCYTOvGJUIyiFKdIxSpa8YpYzKIWtxLIxS568YtgDKMYx0jGMprxjGgTTKMa18jGNrrxjXCMoxznSMc62hLxjnjMox73yMc++vGPgAykIAcSSchCGvKQiEykIhfJyEY68pGQEoykJCdJyUpa8pKYzKQmN8nJThJ68pOgDKUoR0nKUprylKhMpSoSV8nKVrrylbCMpSxnScta2vKWELjMpS53ycte+vKXwAymMIcSScxiGvOYyEymMpfJzGY685nQEIymNKdJzWpa85rYzKY2t8kRzW5685vgDKc4x0nOcprznOgJTKc618lOQQYEADs="
    // let practice_document = resume;
    
    // resume = "data:image/png;base64," + resume;
    // practice_document = "data:image/png;base64," + practice_document;

    // return {
    //   resume, practice_document
    // }
    let results = (await axios({
      url: '/dashboard/student-annex/api',
      method: 'get'
    })).data;
    return results;
  },
  // fetchAnnexHistory(): [AnnexHistories, AnnexHistories] {
  //   let annexs: AnnexHistories = [
  //     { id: '10086', type: 'resume', base64code: '123', created: '2020-01-01'},
  //     { id: '10086', type: 'practive-document', base64code: '123', created: '2020-01-01'},
  //   ];
  //   return [annexs.filter(x => x.type === 'resume'), annexs.filter(x => x.type === 'practive-document')];
  // }
  async uploadAnnex(type: string, base64code: string) {
    let result = (await axios({
      url: '/dashboard/student-annex/api',
      method: 'post',
      params: { type },
      data: { base64code }
    })).data;
    return result;
  },
  async deleteAnnex(id: string) {
    let result = (await axios({
      url: '/dashboard/student-annex/api',
      method: 'delete',
      params: { id }
    })).data;
    return result;
  },
  // async fetchSingleAnnex(id: string) {
  //   axios({
  //     url: '',
  //     method: ''
  //   })
  // }
  // async fetchPracticeDocument() {
  //   let results = (await axios({
  //     url: '/dashboard/practice-document-model',
  //     method: 'get',
  //   })).data;
  // }
}