import { PinDef } from './types';

export const PINS: PinDef[] = [
  {
    name: 'SCLK',
    fullName: '串行时钟 (Serial Clock)',
    description: '同步数据传输的时钟脉冲信号。',
    color: 'text-blue-600',
    direction: 'Master → Slave'
  },
  {
    name: 'MOSI',
    fullName: '主机输出 从机输入 (Master Out Slave In)',
    description: '数据线，数据从主机发送到从机。',
    color: 'text-emerald-600',
    direction: 'Master → Slave'
  },
  {
    name: 'MISO',
    fullName: '主机输入 从机输出 (Master In Slave Out)',
    description: '数据线，数据从从机发回主机。',
    color: 'text-amber-600',
    direction: 'Slave → Master'
  },
  {
    name: 'CS / SS',
    fullName: '片选 (Chip Select)',
    description: '低电平有效信号，用于选中特定的从设备进行通信。',
    color: 'text-red-600',
    direction: 'Master Controls'
  }
];

export const SPI_MODES_INFO = [
  { mode: 0, cpol: 0, cpha: 0, desc: "时钟空闲为低电平 (Low)，上升沿 (前沿) 采样" },
  { mode: 1, cpol: 0, cpha: 1, desc: "时钟空闲为低电平 (Low)，下降沿 (后沿) 采样" },
  { mode: 2, cpol: 1, cpha: 0, desc: "时钟空闲为高电平 (High)，下降沿 (前沿) 采样" },
  { mode: 3, cpol: 1, cpha: 1, desc: "时钟空闲为高电平 (High)，上升沿 (后沿) 采样" },
];