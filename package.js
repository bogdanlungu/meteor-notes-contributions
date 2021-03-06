Package.describe({
  name: 'bogdanlungu:meteor-notes-contributions',
  version: '0.0.1',
  summary: 'Package to count the daily contributions made to the notes you take.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.0.2');
  api.use(['minimongo', 'mongo-livedata', 'templating', 'bogdanlungu:meteor-notes-errors'], ['client', 'server']);
  api.use(['iron:router'], ['client', 'server']);
  api.use(['session'], ['client']);
  api.imply('iron:controller', ['client', 'server']);
  api.addFiles(['meteor-notes-contributions.js', 'common/router.js'], ['client', 'server']);
  api.addFiles(['collections/logs_collections.js', 'server/publications.js', 'server/permissions.js'], ['client', 'server']);
  api.addFiles(['client/calendar.html', 'client/note-contributions.html', 'client/calendar.js', 'client/note-contributions.js', 'client/stylesheet/style.css'], 'client');
  if (api.export) {
    api.export('Contributions');
    api.export('Logs');
  }
});
