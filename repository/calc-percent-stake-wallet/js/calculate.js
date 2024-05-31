const calculate = (_APR = 30, durationInDays = 365, amountOfRefs = 1, refPercent = 20, roundUpTo = 8, useFixedAmount = false) => {

  const _1_YAER_DAYS = 365;
  const APR = +(_APR / _1_YAER_DAYS).toFixed(roundUpTo);
  const PERCENT = +(APR / 100).toFixed(roundUpTo);
  const TOTAL_DAYS_TO_CALC = durationInDays;
  const AMOUNT_OF_REFS = amountOfRefs;
  const REF_PERCENT = (+refPercent) / 100;
  // const REF_PERCENT = 0.2;

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

  const fixedReward = (users.ref.deposit * PERCENT);
  const TO_DAY = 30;

  const calc = (user, day, totalRefs = 0, refReward = 0, i) => {
    let deposit = 0;
    let reward = 0;
    let profit = 0;
    let ref = 0;

    if (useFixedAmount) {
      deposit = (user.deposit + (fixedReward)).toFixed(roundUpTo);
      reward = ((+deposit) - (+fixedReward)).toFixed(roundUpTo);
    } else {
      deposit = (user.deposit + (user.deposit * PERCENT)).toFixed(roundUpTo);
      reward = ((+deposit) - (+user.deposit)).toFixed(roundUpTo);
    }

    if (day % TO_DAY === 0 && i > 0 && totalRefs > 0) {
      const _ref = (refReward * totalRefs).toFixed(roundUpTo);
      ref = +((+_ref) - (+users.ref.prevRef || 0)).toFixed(roundUpTo);
      // console.log(`#day: ${i}`, `_ref: `, (+_ref), `ref: `, (+ref))
      users.ref.prevRef = (+_ref);
      // users.ref.prevRef = ref;
      deposit = ((+deposit) + (+ref)).toFixed(roundUpTo);
      profit = ((+deposit) - 1000).toFixed(roundUpTo);
    }

    user.deposit = (+deposit);

    return { deposit, reward, profit, ref };

  }

  const chart = [];

  let day = 0;
  for (let i = 0; i < TOTAL_DAYS_TO_CALC; i++) {

    day++;

    calc(users.ref, day, 0, 0, i);
    calc(users.me, day, AMOUNT_OF_REFS, (users.ref.deposit - 1000) * REF_PERCENT, i);

    chart.push({
      day: i + 1,
      me: +users.me.deposit.toFixed(roundUpTo),
      ref: +users.ref.deposit.toFixed(roundUpTo),
      all: +((+users.ref.deposit) * AMOUNT_OF_REFS).toFixed(roundUpTo),
    });

    if (day % TO_DAY === 0 && i > 0) {
      day = 0;
    }

  }

  return chart;

}

