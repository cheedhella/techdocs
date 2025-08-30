/**
 * @class iaChart
 * Showing peformace metrics in chart
 */

Ext.define('Pd.view.analyze.iaPerformance.intelligenceMetrics.iaChart', {
    xtype: 'pdiachart',
    extend: 'Ext.container.Container',
    requires: [
        'Pd.view.analyze.iaPerformance.intelligenceMetrics.iaStatisticsTooltip',
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Line',
        'Ext.chart.series.Bar',
        'Ext.chart.plugin.ItemEvents',
        'Uif.I18N'
    ],

    config: {
        iaBaseCls: '',
        processedMetrics: ''
    },

    initComponent: function() {
        var me = this;

        me.items = [
            {
                xtype: 'container',
                cls: me.iaBaseCls + 'chartContainer',
                items: [
                    {
                        xtype: 'container',
                        cls: me.iaBaseCls + 'meticsFilterContainer',
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'combo',
                                cls: me.iaBaseCls + 'chartFilterBox ' + me.getAutomationCls() + 'metricsFilterBox',
                                store: {
                                    fields: ['fieldValue', 'name'],
                                     data : [
                                        {'fieldValue':'bia', 'name':Uif.I18N.get('pd.ia.statistics.baseAndIntAudience')}
                                    ]
                                },
                                editable: false,
                                value: 'bia',
                                displayField: 'name',
                                valueField: 'fieldValue',
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                cls: me.iaBaseCls + 'chartDateFilterContainer',
                                items: [
                                    me.getDateFilterCmp('1d'),
                                    me.getDateFilterCmp('1w'),
                                    me.getDateFilterCmp('1m'),
                                    me.getDateFilterCmp('2m'),
                                    me.getDateFilterCmp('4m'),
                                    me.getDateFilterCmp('6m'),
                                    me.getDateFilterCmp(Uif.I18N.get('pd.ia.statistics.allTime'), true)   
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'cartesian',
                        itemId: 'iaChartCmp',
                        width: 515,
                        height: 255,
                        plugins: {
                            ptype: 'chartitemevents',
                            moveEvents: true
                        },
                        store: {
                            fields: ['executionDate', 'baseAudienceCount','intelligentAudienceCount'],
                            data: me.processedMetrics
                        },
                        axes: [
                            {
                                type: 'numeric',
                                position: 'left',
                                cls: me.iaBaseCls + 'chartLeftField',
                                fields: ['baseAudienceCount','intelligentAudienceCount'],
                                grid: true,
                                label: {
                                    color: '#A3A3A3',
                                    fontSize: '10px'
                                },
                                renderer: function(axis, label, layoutContext, lastLabel) {
                                    me.setAxisLayoutStyle(layoutContext);
                                    return me.formatNumber(label); // format to K,M,B etc

                                }
                            },
                            {
                                type: 'category',
                                cls: me.iaBaseCls + 'chartBottomField',
                                id: 'axesBottomCmp',
                                position: 'bottom',
                                fields: 'executionDate',
                                label: {
                                    color: '#A3A3A3',
                                    fontSize: '10px'
                                },
                                renderer: function(axis, label, layoutContext, lastLabel) {
                                    var datesArray;
                                    me.setAxisLayoutStyle(layoutContext);
                                    datesArray = layoutContext.data;
                                    if(datesArray && (label === datesArray[0] || label === datesArray[datesArray.length - 1]) ){
                                        return label;
                                    }else{
                                        return "";
                                    }
                                }
                            }
                            
                        ],
                        series: [
                            // It is required to show horizontal line over the chart once the
                            // implementation is done
                            /*{
                                type: 'line',
                                style: {
                                  stroke: '#f4be99' ,
                                  lineWidth: 1
                                },
                                cls: me.iaBaseCls + 'chartOpenMetricsLine',
                                xField: 'execuctionDt',
                                yField: 'openRate'
                            },
                            {
                                type: 'line',
                                cls: me.iaBaseCls + 'chartClickMetricsLine',
                                style: {
                                  stroke: '#E39E1A',
                                  lineWidth: 1
                                },
                                xField: 'execuctionDt',
                                yField: 'clickRate'
                            },
                            {
                                type: 'line',
                                cls: me.iaBaseCls + 'chartConversionMetricsLine',
                                style: {
                                  stroke: '#88db83',
                                  lineWidth: 1 
                                },
                                xField: 'execuctionDt',
                                yField: 'conversionRate'
                            },*/
                            {
                                type: 'bar',
                                cls: me.iaBaseCls + 'chartAutoAddedProfilesBar',
                                id: 'iaChartBar',
                                itemId: 'chartBar',
                                style: {
                                    stroke: '#e2e2e2',
                                    maxBarWidth: 5
                                },
                                colors: ['#A6A6A6', '#343434'],
                                xField: 'executionDate',
                                yField: ['baseAudienceCount','intelligentAudienceCount'],
                                listeners: {
                                    itemclick: function(series, item, event, eOpts) {
                                        var record = item.record,
                                            metricsData;

                                        metricsData = record.data;
                                        me.onclickChartBar(metricsData, event, item.index);
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'label',
                        itemId: 'dateTipCmp',
                        cls: me.iaBaseCls + 'dateHighlightTip ' + me.getAutomationCls() + 'metricsDateHighlight',
                        hidden: true
                    },
                    {
                        xtype: 'label',
                        itemId: 'noRecCmp',
                        cls: me.iaBaseCls + 'noRecordLabel ' + me.getAutomationCls() + 'noMetricsInfo',
                        html: Uif.I18N.get('pd.ia.statistics.noDataSelectedDate'),
                        hidden: true
                    }
                ]
            }
        ];
        me.callParent(arguments);
    },

    onclickChartBar: function(metricsData, event, index) {
        var me = this,
            iaPfMetricsCmp,
            dateTip = me.down('#dateTipCmp');
            //iaPrfmncWindow = me.up('iaperformancewindow');

        me.showMetricsTooltip(event, metricsData); //show and update tooltip of metrics
        /*if(iaPrfmncWindow) {
            iaMetricsPerCmp = iaPrfmncWindow.down('pdiaperformancemetrics');
            //updating percentage shown at the right side component
            iaMetricsPerCmp && iaMetricsPerCmp.updateIntelligenceMetricsPer(metricsData);
        }*/
        if(dateTip && index !== 0) {
            dateTip.show();
            dateTip.setHtml(metricsData.executionDate);
            dateTip.setXY([event.getX(), me.down('#iaChartCmp').getY() + 240]);
        }else {
            dateTip.hide();
        }
    },

    setAxisLayoutStyle: function(layoutContext) {
        try {
            layoutContext.attr.canvasAttributes.strokeStyle = '#e2e2e2';
        } catch(e) {
            Ext.log('Axis style updation failed' + e);
        }
    },

    showMetricsTooltip: function(event, metricsData) {
         var me = this,
            tip;
        // destroy previously created tootips
        me.destroyDomElements('pd-analyze-ia-statistics-metricsPerTooltip');
        tip = Ext.create('Pd.view.analyze.iaPerformance.intelligenceMetrics.iaStatisticsTooltip', {
            iaBaseCls: me.iaBaseCls,
            metricsData: metricsData
        });
        tip.showAt([event.getX() - 114, me.down('#iaChartCmp').getY()]);
    },

    destroyDomElements: function (clsName) {
        var elements = Object.values(document.getElementsByClassName(clsName));
        elements.forEach(function (ele, index) {
            ele.remove();
        });
    },

    getDateFilterCmp : function (label, isHIghlighted) {
        var me = this,
            highlightCls = me.iaBaseCls + 'metricsDateRange ' + me.getAutomationCls() + 'metricsTimePeriod ' + me.iaBaseCls + 'filterHighlight',
            cls = me.iaBaseCls + 'metricsDateRange ' + me.getAutomationCls() + 'metricsTimePeriod',
            cmpCls,
            filterCmp;

        if (isHIghlighted) {
            cmpCls = highlightCls;
        } else {
            cmpCls = cls;
        }
        filterCmp = {
            xtype: 'label',
            listeners: {
                element: 'el',
                click: function(e, target){
                   me.applyDateFilter(target);
                }
            },
            cls: cmpCls,
            text: label
        };
        return filterCmp;
    },

    formatNumber: function(labelValue) {
         // Nine Zeroes for Billions
        return Math.abs(Number(labelValue)) >= 1.0e+9

        ? Math.abs(Number(labelValue)) / 1.0e+9 + 'B'
        // Six Zeroes for Millions 
        : Math.abs(Number(labelValue)) >= 1.0e+6

        ? Math.abs(Number(labelValue)) / 1.0e+6 + 'M'
        // Three Zeroes for Thousands
        : Math.abs(Number(labelValue)) >= 1.0e+3

        ? Math.abs(Number(labelValue)) / 1.0e+3 + 'K'

        : Math.abs(Number(labelValue));
    },

    applyDateFilter: function(target) {
        var me = this,
            elements,
            range,
            startDate,
            records = [],
            months,
            noRecCmp = me.down('#noRecCmp'),
            filterMapper;
            
        elements = Object.values(document.getElementsByClassName('pd-analyze-ia-metricsDateRange'));
        elements.forEach(function(elem) {
                elem.classList.remove('pd-analyze-ia-filterHighlight');
        });
        target.classList.add('pd-analyze-ia-filterHighlight');
        if(me.processedMetrics && me.processedMetrics.length) {
            totalDateCount = me.processedMetrics.length;
            filterMapper = {
                '1d': 1,
                '1w': 7,
                '1m': 30,
                '2m': 60,
                '4m': 120,
                '6m': 180
            };
            range = filterMapper[target.textContent];
            if(range < 30) {
                startDate = me.reduceDays(range);
            }else if ( range >= 30 && range <= 180) {
                months = range / 30;
                startDate = me.reduceMonths(months);
            } 
            if(startDate) {
                 records = me.processedMetrics.filter(function(rec) {
                    return (new Date(rec.exeDateStamp).setHours(0,0,0,0) >= startDate.setHours(0,0,0,0))
                }); 
            }else {
                records = me.processedMetrics;
            }
            if(records.length === 0 && noRecCmp) {
                noRecCmp.show();
            }else { 
                noRecCmp.hide();
            }
            me.down('#dateTipCmp') && me.down('#dateTipCmp').hide();
            me.down('#iaChartCmp').store.loadData(records);
            me.down('#iaChartCmp').redraw();
            me.destroyDomElements('pd-analyze-ia-statistics-metricsPerTooltip');
        }
    },

    reduceMonths: function(months) {
        var date = new Date();
        date.setMonth(date.getMonth() - months);
        return date;
    },

    reduceDays: function(days) {
        var date = new Date();
        date.setDate(date.getDate() - days);
        return date;
    },

    getAutomationCls: function () {
      return g_globalsFromJsp.baseCssTestPrefix + 'analyze-iaChart-';
    }
});