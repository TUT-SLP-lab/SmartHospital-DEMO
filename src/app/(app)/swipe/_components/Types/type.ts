export type Name = {
    firstname: string;
    lastname?: string; 
  };
  
  export type Dummy = {
    ID: string; 
    Name: Name; 
  }[];
  
  // 患者のダミーデータ
  export const patients: Dummy = [
    { ID: '0241024', Name: { firstname: 'マサミ', lastname: 'ナガサワ' } },
    { ID: '0241890', Name: { firstname: 'キョウコ', lastname: 'フカダ' } },
    { ID: '0241970', Name: { firstname: 'スズ', lastname: 'ヒロセ' } },
    { ID: '0241989', Name: { firstname: 'アキオ', lastname: 'ウラノ' } },
    { ID: '0241997', Name: { firstname: 'シュウジ', lastname: 'キリタニ' } },
  ];
  
  // 医者のダミーデータ
  export const doctors: Dummy = [
    { ID: 'A100', Name: { firstname: 'システム開発者' } },
    { ID: 'Y100', Name: { firstname: '薬剤師　太郎' } },
    { ID: 'D100', Name: { firstname: '電子　太郎' } },
    { ID: 'I100', Name: { firstname: '医師　太郎' } },
    { ID: 'N100', Name: { firstname: '看護　素留代' } }
  ];
  