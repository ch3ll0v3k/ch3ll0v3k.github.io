//              Сумма начисления  Сумма реварда	Процент от дохода 
// День 1	      1000.0000       0.82192	    0,1643835616
// День 2	      1000.8219       0.8226	    0.1645
// День 3	      1001.6445       0.8233	    0.1647
// День 4	      1002.4678       0.8239	    0.1648
// День 5	      1003.2917       0.8246	    0.1649
// День 6	      1004.1164       0.8253	    0.1651
// День 7	      1004.9417       0.8260	    0.1652
// День 8	      1005.7676       0.8267	    0.1653
// День 9	      1006.5943       0.8273	    0.1655
// День 10	    1007.4216       0.8280	    0.1656
// День 11	    1008.2496       0.8287	    0.1657
// День 12	    1009.0783       0.8294	    0.1659
// День 13	    1009.9077       0.8301	    0.1660
// День 14	    1010.7378       0.8307	    0.1661
// День 15	    1011.5685       0.8314	    0.1663
// День 16	    1012.4000       0.8321	    0.1664
// День 17	    1013.2321       0.8328	    0.1666
// День 18	    1014.0649       0.8335	    0.1667
// День 19	    1014.8983       0.8342	    0.1668
// День 20	    1015.7325       0.8348	    0.1670
// День 21	    1016.5673       0.8355	    0.1671
// День 22	    1017.4029       0.8362	    0.1672
// День 23	    1018.2391       0.8369	    0.1674
// День 24	    1019.0760       0.8376	    0.1675
// День 25	    1019.9136       0.8383	    0.1677
// День 26	    1020.7519       0.8390	    0.1678
// День 27	    1021.5909       0.8397	    0.1679
// День 28	    1022.4305       0.8404	    0.1681
// День 29	    1023.2709       0.8410	    0.1682
// День 30	    1024.1119       0.8417	    0.1683
// -----------------------------------------------------
// День 31      1029.7761       0.8464      0.1693

// 30d: 1024.11193 => 31d: 1024.95366 => 1024.95366-1024.11193 => 0.84173
// 1029.7761 - (1024.11193 + 0.84173 ) => 4.82244

const table = require('./table');

const _1_YAER_DAYS = 365;
const APR = +(30 / _1_YAER_DAYS).toFixed(8);
const PERCENT = +(APR / 100).toFixed(8);
const TOTAL_DAYS_TO_CALC = 365;
const AMOUNT_OF_REFS = 1;

// 1 Year/  no-refs =>  1349.693
// 1 Year/  10-refs =>  2017.539
// 1 Year/ 100-refs =>  8028.154
// 1 Year/1000-refs => 68134.306

// $ 68134.306 / $ 1349.693 == x 50.481 times

const data = [];

const users = {
  me: {
    deposit: 1000,
    prevRef: 0,
  },
  ref: {
    deposit: 1000,
    prevRef: 0,
  },
};

const addLine = () => {
  data.push({
    'i': '---',
    'day': '---',
    'me': '---',
    '%20-of-all-refs': '---',
    'my-profit': '---',

  });
}

const fixedReward = (users.ref.deposit * PERCENT);
const TO_DAY = 30;

const calc = (user, day, totalRefs = 0, refReward = 0, i, useFoxedAmount = false) => {
  let deposit = 0;
  let reward = 0;
  let profit = 0;
  let ref = 0;

  if (useFoxedAmount) {
    deposit = (user.deposit + (fixedReward)).toFixed(8);
    reward = ((+deposit) - (+fixedReward)).toFixed(8);
  } else {
    deposit = (user.deposit + (user.deposit * PERCENT)).toFixed(8);
    reward = ((+deposit) - (+user.deposit)).toFixed(8);
  }

  if (day % TO_DAY === 0 && i > 0 && totalRefs > 0) {
    const _ref = (refReward * totalRefs).toFixed(8);
    ref = +((+_ref) - (+users.ref.prevRef || 0)).toFixed(8);
    // console.log(`#day: ${i}`, `_ref: `, (+_ref), `ref: `, (+ref))
    users.ref.prevRef = (+_ref);
    // users.ref.prevRef = ref;
    deposit = ((+deposit) + (+ref)).toFixed(8);
    profit = ((+deposit) - 1000).toFixed(8);
  }

  user.deposit = (+deposit);

  return { deposit, reward, profit, ref };

}

const chart = [];

let day = 0;
for (let i = 0; i < TOTAL_DAYS_TO_CALC; i++) {

  day++;

  calc(users.ref, day, 0, 0, i);

  // calc(users.me, day, 1, _1REF_30_DAYS, i);
  const { profit, ref } = calc(users.me, day, AMOUNT_OF_REFS, (users.ref.deposit - 1000) * 0.2, i);

  chart.push({
    day: i + 1,
    me: +users.me.deposit.toFixed(8),
    ref: +users.ref.deposit.toFixed(8),
    all: +((+users.ref.deposit) * AMOUNT_OF_REFS).toFixed(8),
  });


  if (day % TO_DAY === 0 && i > 0) {
    addLine();
    day = 0;
    // chart.push({
    //   day: i + 1,
    //   me: +users.me.deposit.toFixed(8),
    //   ref: +users.ref.deposit.toFixed(8),
    // });
  }

  data.push({
    i: `${i + 1}`,
    day: `${day}`,
    me: users.me.deposit,
    ref: users.ref.deposit,
    'my-profit': profit,
    '%20-of-all-refs': ref,
  });

}

console.table(data);
// table(data);

// https://www.encodedna.com/google-chart/make-charts-using-json-data-dynamically.htm

// const c = chart.reduce((acc, item) => {
//   acc.push([
//     item.day,
//     item.me,
//     item.ref,
//     // item.all
//   ]);
//   return acc;
// }, []);

// console.log(JSON.stringify(c));
// console.log(JSON.stringify(chart));



