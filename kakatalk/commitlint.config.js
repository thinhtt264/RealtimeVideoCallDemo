module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Thêm tính năng mới
        'fix', // Sửa lỗi
        'docs', // Thay đổi documentation
        'style', // Thay đổi format code (không ảnh hưởng logic)
        'refactor', // Refactor code
        'perf', // Cải thiện performance
        'test', // Thêm hoặc sửa test
        'chore', // Các thay đổi khác
        'revert', // Revert commit
        'ci', // Thay đổi CI/CD
        'build', // Thay đổi build system
      ],
    ],
    'type-case': [2, 'always', 'lowercase'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lowercase'],
    'subject-case': [2, 'always', 'lowercase'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
  },
};
