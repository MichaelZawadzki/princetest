
var DocRaptor = {
    // Creates an HTML form with doc_attrs set, submits it. If successful
    // this will force the browser to download a file. On failure it shows
    // the DocRaptor error directly.
    createAndDownloadDoc: function(api_key, doc_attrs) {
        var makeFormElement = function(name, value) {
            var element = document.createElement("textarea");
            element.name = name;
            element.value = value;
            return element;
        };

        var form = document.createElement("form");
        form.action = "https://docraptor.com/docs";
        form.method = "post";
        form.style.display = "none";

        form.appendChild(makeFormElement("user_credentials", api_key));

        for (var key in doc_attrs) {
            if (key == "prince_options") {
                for (var option in doc_attrs.prince_options) {
                    form.appendChild(makeFormElement("doc[prince_options][" + option + "]", doc_attrs.prince_options[option]))
                }
            } else {
                form.appendChild(makeFormElement("doc[" + key + "]", doc_attrs[key]))
            }
        }

        document.body.appendChild(form);
        form.submit();
    }
};

var processContent = function (_apiKey)
{
    console.log('Processing...');

    var startTime = Date.now();
    var htmlContent = document.body.innerHTML;
    //var htmlContent = document.getElementsByClassName('pagedContent')[0].innerHTML;

    DocRaptor.createAndDownloadDoc(_apiKey, {
        test: true,
        type: "pdf",
        document_url: "https://michaelzawadzki.github.io/princetest/example.html"
        //document_url: "https://apps-studios.demo.learning.amplify.com/prince/raptor/example.html"
        //document_content: htmlContent,
        //document_content: document.querySelector('html').innerHTML, // use this page's HTML
        // document_content: "<h1>Hello world!</h1>",               // or supply HTML directly
        // document_url: "http://example.com/your-page",            // or use a URL
        // javascript: true,                                        // enable JavaScript processing
        // prince_options: {
        //   media: "screen",                                       // use screen styles instead of print styles
        // }
    });

    var endTime = Date.now();
    console.log('ASync call kicked off in ' + (endTime - startTime) + ' with body = ' + htmlContent);
};