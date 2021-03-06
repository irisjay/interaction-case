var set_nodes_visibility = function (value) {
    return R .cond ([
        [function (x) {
        	return R .is (NodeList) (x) || R .is (Array) (x)
        }, R .forEach (function (node) {
            node .style .visibility = value;
        })],
        [R .T, function (node) {
            node .style .visibility = value;
        }]
    ]);
}

var interaction_case = function (cases) {
    return interaction (transition (function (intent, license) {
        return function (tenure) {
            var from = intent [0];
            var to = intent [1];
            if (from) {
                set_nodes_visibility ('hidden') (cases [from])
            }
            else {
                [cases]
                    .map (filterObjIndexed (function (x, key) {
                        return key !== to
                    }))
                    .map (R .forEachObjIndexed (set_nodes_visibility ('hidden')))
            }
            [cases [to]] .forEach (set_nodes_visibility (''));
            tenure (to);
            tenure .end (true);
        };
    }));
}