(function () {
    function Ticker(className) {
        var me = this;
        me.el = document.getElementsByClassName(className)[0];
        me.init();
    }
    Ticker.prototype = {
        init: function () {
            var me = this,
                item;
            me.interVal = 1000; //1s
            me.items = me.el.getElementsByTagName("li");
            item = me.items[0];
            me.initialTop = me.el.offsetHeight;
            item.style.marginTop = me.initialTop + 'px';
            me.setUnCheckedImage(me.items);
            me.totalItems = me.items.length;
            me.timer = null;
            me.index = 0;
            me.setCheckedImage(me.items[me.index]);
            me.startTicker();
            me.addCls();
        },

        setUnCheckedImage: function (items) {
            var item;
            for (var key = 1; key < items.length; key++) {
                item = items[key];
                item.classList.remove('checked-image');
                item.style.opacity = 0.5;
                if (!item.classList.contains('unchecked-image')) {
                    item.classList.add('unchecked-image');
                }
            }
        },

        setCheckedImage: function (item) {
            item.classList.remove('unchecked-image');
            item.style.opacity = 1;
            if (!item.classList.contains('checked-image')) {
                item.classList.add('checked-image');
            }
        },

        addCls: function () {
            var el = this.el;
            if (!el.classList.contains('ticker-animation')) {
                el.classList.add('ticker-animation');
            }
        },
        removeCls: function () {
            var el = this.el;
            if (el.classList.contains('ticker-animation')) {
                el.classList.remove('ticker-animation');
            }
        },
        startTicker: function () {
            var me = this,
                item = me.items[0],
                previousTop = parseInt(item.style.marginTop),
                newTop;

            if (me.resetFlag) {
                me.setUnCheckedImage(me.items);
                me.index = 0;
                previousTop = me.initialTop;
                item.style.opacity = 1;
                me.removeCls();
                newTop = me.initialTop - item.offsetHeight;
                me.resetFlag = false;
            } else {
                newTop = (previousTop - item.offsetHeight)
            }
            if (previousTop == me.initialTop) {
                setTimeout(function () {
                    me.addCls();
                }, 1);
            }
            item.style.marginTop = newTop + "px";
            me.timer = setTimeout(function () {
                if (me.index > 1) {
                    if (me.index - 2 < me.totalItems) {
                        me.items[me.index - 2].style.opacity = 0.5;
                    }
                    if (me.index - 1 < me.totalItems) {
                        me.setCheckedImage(me.items[me.index - 1]);
                    }
                    if (me.index - 3 == me.totalItems) {
                        me.resetFlag = true;
                    }
                }
                me.startTicker();
            }, me.interVal);
            me.index++;
        },

        stopTicker: function () {
            clearTimeout(this.timer)
        }
    };

    document.addEventListener("DOMContentLoaded", function () {
        window.vTicker = new Ticker('splashcontainer');
    });
})();