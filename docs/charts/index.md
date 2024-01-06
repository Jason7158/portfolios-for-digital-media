# Some self-implemented charts

# Liquid Fill Chart
import 'echarts-liquidfill'

{
        backgroundColor: "#051330",
        title: {
          text: workingFace.plan.percentage + "%",
          x: "center",
          y: "center",
          textStyle: {
            fontSize: "12",
            fontWeight: "400",
            fontFamily: "Source Han Sans CN",
            color: "#fff",
          },
        },
        series: [
          {
            type: "liquidFill",
            data: [workingFace.plan.percentage / 100],
            radius: "56%",
            center: ["50%", "50%"],
            amplitude: 2,
            color: [
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#04fcf6",
                  },
                  {
                    offset: 1,
                    color: "#3dc6f0",
                  },
                ],
              },
            ],
            label: {
              show: false,
            },
            backgroundStyle: {
              borderWidth: 1,
              color: "#051330",
            },
            outline: {
              show: false,
            },
          },
          {
            name: "background",
            type: "pie",
            emphasis: { disabled: true },
            radius: ["0%", "56%"],
            center: ["50%", "50%"],
            label: {
              show: false,
            },
            labelLine: { show: false },
            itemStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "transparent",
                  },
                  {
                    offset: 1,
                    color: "#ffffffab",
                  },
                ],
              },
            },
            data: [1],
          },
          {
            type: "pie",
            clockwise: true,
            emphasis: { disabled: true },
            radius: ["66%", "70%"],
            center: ["50%", "50%"],
            label: {
              show: false,
            },
            labelLine: { show: false },
            itemStyle: {
              color: "#39617b",
            },
            data: [1],
          },
          {
            type: "pie",
            silent: true,
            emphasis: { disabled: true },
            radius: ["70%", "79%"],
            center: ["50%", "50%"],
            label: {
              show: false,
            },
            itemStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#05fcf655",
                  },
                  {
                    offset: 1,
                    color: "transparent",
                  },
                ],
              },
            },
            data: [1],
          },
        ],
      }