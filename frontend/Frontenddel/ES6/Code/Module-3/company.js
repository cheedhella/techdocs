export let name = "Microsoft";

let company = {
    getCompany: function() {
        return name;
    },
    setCompany: function(newValue) {
        this.name = newValue;
    }
};

export default company;