function ddg_spice_editor(api_result) {

    var script = $('[src*="/js/spice/editor/"]')[0];
    var source = $(script).attr("src");
    var language = source.match(/editor\/([^\/]+)/)[1];

    nrj(DDG.get_asset_path('editor', 'ace.js'));

        // Function referenced in ace.js
        window.aceScriptLoaded = function() {

            var editor_id = "ace-editor";

            var editor = ace.edit(editor_id);

            // Set theme based on DDG theme
            if ($(".dark-header").length) {
                editor.setTheme("ace/theme/monokai");
            } else {
                editor.setTheme("ace/theme/eclipse");
            }

            // Listen for clicks on the default theme button and change editor theme accordingly
            $(".nav-menu__theme--default").click(function(e) {
                editor.setTheme("ace/theme/eclipse");
                e.stopPropagation();
            });

            // Listen for clicks on the dark theme button and change editor theme accordingly
            $(".nav-menu__theme--d").click(function(e) {
                editor.setTheme("ace/theme/monokai");
                e.stopPropagation();
            });

            editor.getSession().setMode("ace/mode/" + language);

            $("#" + editor_id).height("400px");

            // Stop DDG keybindings, when editor has focus
            $("#" + editor_id).keydown(function(e) {
                e.stopPropagation();
            });
        }

    Spice.add({
        id: 'editor',
        name: 'Editor',
        data: api_result,
        meta: {
            sourceName: "Ace",
            sourceUrl: "http://ace.c9.io/"
        },
        normalize: function(item) {

            function formatLanguageName(language) {
                var languageNames = {
                    "javascript": "JavaScript",
                    "python": "Python"
                };

                return languageNames[language.toLowerCase()];
            }

            return {
                title: formatLanguageName(language) + " Editor"
            };
        },
        templates: {
            group: 'base',
            options: {
                content: Spice.editor.editor
            }
        },
    });
    //Need this to make sure jQuery does add a uniqe key to the requested URL (which causes problems)
    $.ajaxSetup({
        cache: true
    });
    $.getScript("/share/spice/editor/ace.js", function(data, textStatus, jqxhr) {
        var editor_id = "ace-editor";
        var editor = ace.edit(editor_id);

        // Set theme based on DDG theme
        if($(".dark-header").length) {
            editor.setTheme("ace/theme/monokai");
        } else {
            editor.setTheme("ace/theme/eclipse");
        }

        // If the user changes DDG theme, change the editor theme too
        $(".nav-menu__theme--default").click(function(e) {
            editor.setTheme("ace/theme/eclipse");
            e.stopPropagation();
        });

        $(".nav-menu__theme--d").click(function(e) {
            editor.setTheme("ace/theme/monokai");
            e.stopPropagation();
        });

        editor.getSession().setMode("ace/mode/" + language);

        $("#" + editor_id).height("400px");

        // Stop DDG keybindings, when editor has focus
        $("#" + editor_id).keydown(function(e) {
            e.stopPropagation();
        });
    });
};

ddg_spice_editor();