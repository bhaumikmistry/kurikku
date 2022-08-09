const get_data = function() {
    console.log("get_data()")
    var link = 'https://raw.githubusercontent.com/bhaumikmistry/kurikku/hold-multiple-images/docs/data/levels/one.json'
    return $.getJSON(link).then(function(data){
        return data;
    })
};