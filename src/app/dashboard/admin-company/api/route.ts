import { nanoid } from 'nanoid';

import { dropSafty, executeQuery, insertSafty, select, updateSafty } from "@/utils/db";
import { Console } from 'console';
import { NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  let result: unknown;
  let query = request.nextUrl.searchParams;
  let id = query.get('id');
  try {
    if (id)
      result = await select({ field: '*', table: 'company', where: { id }, order: { name: {} } });
    else 
      result = await select({ field: '*', table: 'company', where: {  }, order: { name: {} } });
  } catch (error) {
    result = error;
  } finally {
    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: 'application/json',
    });
    return new Response(blob, {
      status: 200,
      headers: { 'Set-Cookie': `token=hi` }
    });
  }
}

export async function POST(request: Request) {
  let results: unknown;
  let param = request.body;
  // console.log(request.url.lastIndexOf())

  let request_body = await (await new Response(param)).blob();
  let { name, phone, mail } = JSON.parse(await request_body.text()); // fetch company name, phone and mail message
  let license = 'R0lGODlhqASoAfcAAAAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBVZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDVmQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMrzDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YrAGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaqM2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmAmZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9VM/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//VZv/Vmf/VzP/VAP//M///Zv//mf//zP///wAAAAAAAAAAAAAAACH5BAEAAPwALAAAAACoBKgBAAitAPcJHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzps2bOHPq3Mmzp8+fQIMKHUq0qNGjSJMqXcq0qdOnUKNKnUq1qtWrWLNq3cq1q9evYMOKHUu2rNmzaNOqXcu2rdu3cOPKnUu3rt27ePPq3cu3r9+/gAMLHky4sOHDiBMrXsy4sePHkCNLnky5suXLmDNIa97MubPnz6BDix5NurTp06hTq17NurXr17Bjy55Nu7bt27hz697Nu7fv38CDCx9OvLjx48iTK1/OvLnz59CjS59Ovbr169izOGvfzr279+/gw4sfT768+fPo06tfz769+/fw48ufT7++/fv48+vfz7+///8ABijggAQWaOCBCCaoNeCCDDbo4IMQRijhhBRWaOGFGGao4YYcdujhhyCGKOKIJJZo4okopqjiiiy26OKLMMYo44w0LdZo44045qjjjjz26OOPQAYp5JBEFmnkkUgmqeSSTDbp5JNQRinllFRWaeWVWClmqeWWXHbp5ZdghinmmGSWaeaZaKap5ppstunmm3DGKeecdNZp55145iep55589unnn4AGKuighBZq6KGIJqrooow26uijkEYq6aSUVmrppZgjZqrpppx26umnoIYq6qiklmrqqaimquqqrLbq6quwxirrrLQg1mrrrbjmquuuvPbq66/ABivssMQWa+yxyCar7LLMNusg7LPQRivttNRWa+212Gar7bbcduvtt+CGK+645JZr7rke6Kar7rrstuvuu/DGK++89NZr77345qvvvvz26++/HAAHLPDABBds8MEIJ6zwwgw37PDDEEcs8cQUV2wc8cUYZ6zxxhx37PHHIIcs8sgkl2zyySinrPLKLBq37PLLMMcs88w012zzzTjnrPPOPPfs889ABxkt9NBEF2300UgnrfTSTDft9NNQRy311FRXGW311VhnrfXWXHft9ddghy322GSXbfbZaKcYrfbabLft9ttwxy333HTXbffdeOet9958Fvft99+ABy744IQXbvjhiCeu+OKMN+4X+OOQRy755JRXbvnlmGeu+eacd+7556AWhy766KSXbvrpqKeu+uqst+7667DHLhb77LTXbvvtuOeu++689+7778AHL/zwFMQXb/zxyCev/PLMN+/889BHL/30FNRXb/312Gev/fbcd+/99+CHL/74FOSXb/756Kev/vrst+/++/DHL//8FPTXb//9+Oev//789+///wAMoAAHFUjAAhrwgAhMoAIXyMAGOvCBEIygBBQnSMEKWvCCGMygBjfIwQ568IMgDBWhCEdIwhKa8IQoTKEKV8jCFrrwhTATjKEMZ0jDGtrwhjjMoQ53yMMe+hXwh0AMohCHSMQiGvGISEyiEpfIxCYTOvGJUIyiFKdIxSpa8YpYzKIWtxLIxS568YtgDKMYx0jGMprxjGgTTKMa18jGNrrxjXCMoxznSMc62hLxjnjMox73yMc++vGPgAykIAcSSchCGvKQiEykIhfJyEY68pGQEoykJCdJyUpa8pKYzKQmN8nJThJ68pOgDKUoR0nKUprylKhMpSoSV8nKVrrylbCMpSxnScta2vKWELjMpS53ycte+vKXwAymMIcSScxiGvOYyEymMpfJzGY685nQEIymNKdJzWpa85rYzKY2t8kRzW5685vgDKc4x0nOcprznOgJTKc618lOQQYEADs='

  try {
    let id = nanoid();
    let sub_results = await insertSafty({ field: { id, name, phone, mail, license }, table: 'company', insert_values_num: 5 });
    results = { ...sub_results, id,  }
  } catch (error: unknown) {
    results = error;
  } finally {
    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: 'application/json',
    });
    return new Response(blob, {
      status: 200,
    });
  }
}

export async function DELETE(request: NextRequest) {

  // interface deleteQueryParams extends URLSearchParams { id: string }

  let results: unknown;
  let query = request.nextUrl.searchParams;
  let id = query.get('id');

  if (!id) {
    const blob = new Blob([JSON.stringify({ ok: false, error: 'id should not be empty' }, null, 2)], {
      type: 'application/json', 
    });
    return new Response(blob, {
      status: 200,
      headers: { 'Set-Cookie': 'token=hi' }
    });
  }

  try {
    results = await dropSafty({ table: 'company', where: { id } });
  } catch (error: unknown) {
    results = error;
  } finally {
    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: 'application/json',
    });
    return new Response(blob, {
      status: 200,
      headers: { 'Set-Cookie': 'token=hi' },
    });
  }
}

export async function PUT(request: NextRequest) {
  let results: unknown;
  let query = request.nextUrl.searchParams;
  let id = query.get('id');
  let request_body = await (await new Response(request.body)).blob();
  let change_msg = JSON.parse(await request_body.text());
  for (let change_msg_key of Object.keys(change_msg)) {
    if ( !change_msg[change_msg_key] ) {
      delete change_msg[change_msg_key];
    }
  }

  if (!id) {
    const blob = new Blob([JSON.stringify({ ok: false, error: 'id should not be empty' }, null, 2)], {
      type: 'application/json'
    });
    return new Response(blob, {
      status: 200,
      headers: { 'Set-Cookie': 'token=hi' },
    });
  }

  try {
    results = await updateSafty({
      field: change_msg,
      table: 'company',
      where: { id }
    });
  } catch (error: unknown) {
    results = error; 
  } finally {
    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: 'application/json',
    });
    return new Response(blob, {
      status: 200,
      headers: { 'Set-Cookie': 'token=hi' }
    });
  }
}