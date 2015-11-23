Package.describe({
  name: 'bogdanlungu:meteor-notes-contributions',
  version: '0.0.1',
  summary: 'Package to count the daily contributions made to the notes you take.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');
  api.addFiles([''], 'client');
  if (api.export)
  api.export('Contributions');
});
