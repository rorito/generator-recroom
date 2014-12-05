App.ApplicationAdapter = DS.FixtureAdapter;

// Add ability to query fixtures in development mode.
if (App.ApplicationAdapter === DS.FixtureAdapter) {
    DS.FixtureAdapter.reopen({
        queryFixtures: function(records, query, type) {
            return records.filter(function(record) {
                for (var key in query) {
                    if (!query.hasOwnProperty(key)) {
                        continue;
                    }

                    var value = query[key];

                    if (record[key] !== value) {
                        return false;
                    }
                }

                return true;
            });
        }
    });
}
