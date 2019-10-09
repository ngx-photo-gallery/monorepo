module.exports = {
  name: 'mosaic',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/mosaic',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
