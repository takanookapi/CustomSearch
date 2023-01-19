window.GeneralFrame = {
    /**
     * ローディングスピナーを表示する
     * @returns 表示したスピナーのjQueryオブジェクト
     */
    showLoading: function(appendTo) {
        "use strict";
        var $spinner;
        var pos = appendTo ? "absolute" : "fixed";
        var zi = appendTo ? "auto" : "1000";
        var at = appendTo ? appendTo : "body";
        if ($(".cssload-container").length === 0) {
            $spinner = $('<div class="cssload-container" style="position:' + pos + ';z-index:' + zi + '"><div class="cssload-speeding-wheel"></div></div>');
            $spinner
                .hide()
                .appendTo(at)
                .delay(300)
                .fadeIn(500);
        }
        return $spinner;
    },
    /**
     * ローディングスピナーを非表示にする
     */
    hideLoading: function(spinner) {
        "use strict";
        var $target = $spinner ? $spinner : $(".cssload-container");
        $target.find(":hidden").remove();
        $target
            .stop(true)
            .fadeOut(500, function() { $(this).remove();});
    },
    /**
     * 特殊文字をHTMLエンティティに変換
     */
    htmlSpecialChars: function(ch) {
        ch = ch.replace(/&/g,"&amp;") ;
        ch = ch.replace(/"/g,"&quot;") ;
        ch = ch.replace(/'/g,"&#039;") ;
        ch = ch.replace(/</g,"&lt;") ;
        ch = ch.replace(/>/g,"&gt;") ;
        return ch ;
    },
    /**
     * 3桁区切
     */
    formatNumber: function(num){
        return num.toString().split(".")
        .map(function(value, i){
            if(i) return value;
            return value.replace(/([0-9]+?)(?=(?:[0-9]{3})+$)/g , "$1,");
        })
        .join(".");
    },
};