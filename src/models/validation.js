function Validation(){
    function showMess(spanID,mess) {
        getEle(spanID).style.display = "block";
        getEle(spanID).innerHTML = mess; 
    }

    function hideMess(spanID) {
        getEle(spanID).style.display = "none";
        getEle(spanID).innerHTML = ""; 
    }

    this.kiemTraRong = function(value,spanID, mess){
        if(value === ""){
            showMess(spanID,mess);
            return false;
          }

        hideMess(spanID);    
        return true;
    }

    this.kiemTraSo = function(value,spanID,mess){
        var letter = '^[0-9]+$';
        if(value.match(letter)){
            hideMess(spanID); 
            return true;
        }
        showMess(spanID,mess);
        return false;
    }

    this.kiemTraDoDaiKyTu =function(value,spanID,min,max) {
        if(value.length >= min && value.length<=max){
            hideMess(spanID);
            return true;
        }
        getEle(spanID).style.display = "block";
        getEle(spanID).innerHTML = "(*) Vui lòng nhập từ " +min+ " đến " +max+ " ký tự";
        return false;
    }

    this.kiemTraChuoiKyTu = function(value,spanID,mess){
        var letter = /^[a-zA-ZÀ-ÿ ]+$/;
        if(value.match(letter)){
            hideMess(spanID);
            return true;
        }
        showMess(spanID,mess);
        return false;
    }

    this.kiemTraLuong = function(value,spanID,mess){
        if(value>=1000000 && value<=20000000){
            hideMess(spanID);
            return true;
        }
        showMess(spanID,mess);
        return false;
    }

    this.kiemTraSoGioLam = function(value,spanID,mess){
        if(value>=50 && value<=150){
            hideMess(spanID);
            return true;
        }
        showMess(spanID,mess);
        return false;
    }
}