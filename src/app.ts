const app = () => {
  // 执行屏蔽操作
  const blockUsers = () => {
    const blockedUsers: string[] = GM_getValue('blockedUsers', []);
    const a = document.getElementById('content')!.children[1].children[0].children[1];

    if (blockedUsers.length > 0) {
      blockedUsers.forEach((user) => {
        console.log(a);
      });
    }
  };

  // 添加菜单选项，允许用户输入或编辑屏蔽的用户名
  GM_registerMenuCommand('编辑屏蔽用户', () => {
    const blockedUsers: string[] = GM_getValue('blockedUsers', []);
    const existingUsers = blockedUsers.join(', ');
    const userInput = prompt('请输入要屏蔽的用户名（使用逗号、空格或换行符分隔多个用户名）：', existingUsers);

    if (userInput !== null) {
      // 用户点击“取消”时返回 null
      // 通过正则表达式拆分输入的字符串，支持逗号、空格、换行符作为分隔符
      const users = userInput.split(/[\s,]+/).filter(Boolean);
      GM_setValue('blockedUsers', users);
      alert(`已更新屏蔽用户列表：\n${users.join('\n')}`);
    }
    blockUsers(); // 立即应用屏蔽规则

    // 处理动态加载内容
    const observeContentChanges = () => {
      const observer = new MutationObserver(() => {
        blockUsers(); // 在内容变化时应用屏蔽规则
      });

      // 监听整个文档的子树变化，以捕捉动态加载的内容
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    };

    // 初始屏蔽操作
    blockUsers();
    // 开始观察内容变化
    observeContentChanges();
  });
};
export default app;
