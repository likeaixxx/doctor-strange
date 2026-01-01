import requests
import re

url = "https://raw.githubusercontent.com/Tartarus2014/Loon-Script/refs/heads/master/Plugin/FKTG.lpx"

response = requests.get(url)
content = response.text

# 提取元数据并去掉空格
lines = []
# lines.append('[General]')
for line in content.split('\n'):
    if line.startswith('#!'):
        pass
    elif line.strip() == '[Host]':
        # lines.append('\n[Host]')
        pass
    elif '=' in line and 'use-in-proxy' in line:
        # 移除 Loon 特定参数
        cleaned = re.sub(r',\s*use-in-proxy=\w+', '', line)
        lines.append(cleaned)
    elif line.strip() and not line.startswith('#!'):
        lines.append(line)

# lines.append('[Rule]')
# lines.append('FINAL,DIRECT')

result = '\n'.join(lines)

with open('fktg', 'w', encoding='utf-8') as f:
    f.write(result)
