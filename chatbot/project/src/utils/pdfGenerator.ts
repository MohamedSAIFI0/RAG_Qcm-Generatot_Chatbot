import { jsPDF } from 'jspdf';
import { Message } from '../types';

export const generatePDF = (messages: Message[]) => {
  const pdf = new jsPDF();
  let yPosition = 20;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  const lineHeight = 7;

  pdf.setFontSize(16);
  pdf.text('Llama3 Chat Conversation', margin, yPosition);
  yPosition += lineHeight * 2;

  pdf.setFontSize(10);
  messages.forEach((message) => {
    const role = message.role === 'user' ? 'You' : 'Llama3';
    const timestamp = new Date(message.createdAt).toLocaleString();
    
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${role} - ${timestamp}`, margin, yPosition);
    yPosition += lineHeight;
    
    pdf.setFont('helvetica', 'normal');
    const textLines = pdf.splitTextToSize(message.content, pageWidth - margin * 2);
    
    textLines.forEach((line: string) => {
      if (yPosition > pdf.internal.pageSize.getHeight() - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
    
    yPosition += lineHeight;
  });

  pdf.save('llama3-chat-conversation.pdf');
};