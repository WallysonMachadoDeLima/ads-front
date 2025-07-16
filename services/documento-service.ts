import { api } from './config-service';
import type { ICreateUpdateDocumentoDto, IDocumentoDto } from '~/interfaces';

// Mock data temporário até a API ter o endpoint
const mockDocumentos: IDocumentoDto[] = [
  {
    id: 1,
    nome: "Regulamento Acadêmico",
    descricao: "Regulamento geral dos cursos superiores da instituição",
    url: "https://example.com/regulamento.pdf"
  },
  {
    id: 2,
    nome: "Manual do Estudante",
    descricao: "Guia completo para novos estudantes com informações importantes",
    url: "https://example.com/manual.pdf"
  },
  {
    id: 3,
    nome: "Calendário Acadêmico 2025",
    descricao: "Cronograma de atividades acadêmicas para o ano letivo de 2025",
    url: "https://example.com/calendario.pdf"
  }
];

let nextId = 4;

export const documentoService = {

  async create(payload: ICreateUpdateDocumentoDto): Promise<IDocumentoDto> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay da API
    const novoDocumento: IDocumentoDto = {
      id: nextId++,
      ...payload
    };
    mockDocumentos.push(novoDocumento);
    return novoDocumento;
  },

  async findAll(): Promise<IDocumentoDto[]> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 300)); // Simular delay da API
    return [...mockDocumentos];
  },

  async findOneById(id: number): Promise<IDocumentoDto> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 200)); // Simular delay da API
    const documento = mockDocumentos.find(d => d.id === id);
    if (!documento) {
      throw new Error('Documento não encontrado');
    }
    return documento;
  },

  async update(id: number, payload: ICreateUpdateDocumentoDto): Promise<IDocumentoDto> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 400)); // Simular delay da API
    const index = mockDocumentos.findIndex(d => d.id === id);
    if (index === -1) {
      throw new Error('Documento não encontrado');
    }
    mockDocumentos[index] = { id, ...payload };
    return mockDocumentos[index];
  },

  async delete(id: number): Promise<void> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 300)); // Simular delay da API
    const index = mockDocumentos.findIndex(d => d.id === id);
    if (index === -1) {
      throw new Error('Documento não encontrado');
    }
    mockDocumentos.splice(index, 1);
  },
};
