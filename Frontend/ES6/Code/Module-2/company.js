let myCompany = "Microsoft";

let company = {
    getCompany: function() {
        return myCompany;
    },
    setCompany: function(newValue) {
        this.myCompany = newValue;
    }
};

export default company;