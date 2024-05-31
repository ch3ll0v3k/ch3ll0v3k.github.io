
const createChart = (elementId, title = '', data_0 = [], data_1 = []) => {

  const chart = new CanvasJS.Chart(elementId, {
    animationEnabled: false,
    theme: "light2",
    title: {
      // text: `1 Year, Based on (${x} referrals)`
      text: title,
    },
    // height: 400,
    axisX: {
      // valueFormatString: "DD MMM",
      valueFormatString: "",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    axisY: {
      title: "Balance",
      includeZero: false,
      crosshair: {
        enabled: true
      }
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "bottom",
      horizontalAlign: "left",
      dockInsidePlotArea: true,
      itemclick: toogleDataSeries
    },
    data: [
      {
        type: "line",
        showInLegend: true,
        name: "My Profit",
        markerType: "square",
        xValueFormatString: "",
        color: "#F08080",
        dataPoints: data_0,
      },
      {
        type: "line",
        showInLegend: true,
        name: "My Ref. Profit",
        lineDashType: "dash",
        dataPoints: data_1,
      }
    ]
  });
  chart.render();

  function toogleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }

  return chart;

}