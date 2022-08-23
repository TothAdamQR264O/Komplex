package SulyozattAtlagSzamitas;
import java.awt.EventQueue;

import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JTable;
import javax.swing.JScrollPane;
import javax.swing.JTextField;
import javax.swing.table.TableColumn;
import javax.swing.table.TableRowSorter;

import java.awt.Color;
import javax.swing.JLabel;
import javax.swing.JButton;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.awt.event.ActionEvent;
import Program.*;
import Terkep.Map;
import java.awt.BorderLayout;
import javax.swing.JPanel;
import java.awt.GridLayout;

public class SatlagSz extends JFrame{
	private JTable table;
	private JTextField textAtlag;
	private TablaKezelo tabKez;
	private ArrayList<Targyak> alap = new ArrayList<Targyak>();
	private double atlag;
	private JTextField textNev;
	private JTextField textKredit;
	private JTextField textJegy;
	private Ellenorzo c = new Ellenorzo();

	public SatlagSz(TablaKezelo bta) {
		//super(f, "Tárgyak");
		tabKez = bta;
		setBounds(100, 100, 450, 397);
		getContentPane().setLayout(new BorderLayout(0, 0));
		setExtendedState(JFrame.MAXIMIZED_BOTH);
		
		JPanel KozepsoPanel = new JPanel();
		getContentPane().add(KozepsoPanel, BorderLayout.CENTER);
		KozepsoPanel.setLayout(new GridLayout(0, 1, 0, 0));
		
		JScrollPane scrollPane = new JScrollPane();
		KozepsoPanel.add(scrollPane);
		
		table = new JTable(tabKez);
		scrollPane.setViewportView(table);
		
		TableColumn tc = null;
		for(int i = 0; i < 4; i++) {
			tc = table.getColumnModel().getColumn(i);
			if(i == 0) {
				tc.setPreferredWidth(5);
			}
			else if(i == 1) {
				tc.setPreferredWidth(50);
			}
			else {
				tc.setPreferredWidth(20);
			}
		}
		TableRowSorter<TablaKezelo> trs = (TableRowSorter<TablaKezelo>)table.getRowSorter();
		//trs.setSortable(0, false);
		
		table.setAutoCreateRowSorter(true);
		
		JPanel AlsoPanel = new JPanel();
		getContentPane().add(AlsoPanel, BorderLayout.SOUTH);
		AlsoPanel.setLayout(new BorderLayout(0, 0));
		
		JPanel BeviteliPanel = new JPanel();
		AlsoPanel.add(BeviteliPanel, BorderLayout.NORTH);
		
		JPanel SuAtlagPanel = new JPanel();
		AlsoPanel.add(SuAtlagPanel, BorderLayout.WEST);
		
		JPanel KezeloPanel = new JPanel();
		AlsoPanel.add(KezeloPanel, BorderLayout.EAST);
		
		JPanel EgyebmenuPanel = new JPanel();
		AlsoPanel.add(EgyebmenuPanel, BorderLayout.SOUTH);
		SuAtlagPanel.setLayout(new GridLayout(0, 1, 0, 0));
		
		
		
		JLabel lblSatlag = new JLabel("Sulyozott átlag");
		SuAtlagPanel.add(lblSatlag);
		
		
		
		JButton btnSzamitas = new JButton("Számítás");
		btnSzamitas.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				alap.clear();
				Listfeltolto(alap);
				Szamitas();
				textAtlag.setText(""+atlag);
			}
		});
		
		textAtlag = new JTextField();
		textAtlag.setBackground(Color.WHITE);
		textAtlag.setEditable(false);
		SuAtlagPanel.add(textAtlag);
		textAtlag.setColumns(10);
		SuAtlagPanel.add(btnSzamitas);
		BeviteliPanel.setLayout(new BorderLayout(0, 0));
		
		JPanel BFelsoPanel = new JPanel();
		BeviteliPanel.add(BFelsoPanel, BorderLayout.NORTH);
		BFelsoPanel.setLayout(new GridLayout(0, 3, 0, 0));
		
		JLabel lblNev = new JLabel("Tárgy név");
		BFelsoPanel.add(lblNev);
		
		JLabel lblKredit = new JLabel("Kredit");
		BFelsoPanel.add(lblKredit);
		
		JLabel lblJegy = new JLabel("Jegy");
		BFelsoPanel.add(lblJegy);
		
		JPanel BAlsoPanel = new JPanel();
		BeviteliPanel.add(BAlsoPanel, BorderLayout.SOUTH);
		BAlsoPanel.setLayout(new GridLayout(0, 3, 0, 0));
		
		textNev = new JTextField();
		BAlsoPanel.add(textNev);
		textNev.setColumns(10);
		
		textKredit = new JTextField();
		textKredit.setColumns(10);
		BAlsoPanel.add(textKredit);
		
		textJegy = new JTextField();
		textJegy.setColumns(10);
		BAlsoPanel.add(textJegy);
		
		
		
		JButton btnHozad = new JButton("Hozáad");
		btnHozad.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if(c.filled(textNev, "Név")) {
					if(c.goodInt(textKredit, "Kredit")) {
						if(c.goodInt(textJegy, "Jegy")) {
							Megerosito me = new Megerosito(SatlagSz.this, "Biztos létreakarod hozni?");
							me.setVisible(true);
							if(me.erosit) {
								FileManager.sAtlagInsert(RTF(textNev), RTF(textKredit), RTF(textJegy),  "Data\\eredmenyek.csv");
								dispose();
								tabKez = FileManager.sAtlagBeolvaso("Data\\eredmenyek.csv");
								SatlagSz el = new SatlagSz(tabKez);
								el.setVisible(true);
							}	
						}
					}
				}
			}
		});
		KezeloPanel.setLayout(new GridLayout(0, 1, 0, 0));
		KezeloPanel.add(btnHozad);
		
		JButton btnMdost = new JButton("M\u00F3dos\u00EDt");
		btnMdost.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				int db = 0, jel = 0, x = 0;
				for(x = 0; x < tabKez.getRowCount(); x++) {
					if((Boolean)tabKez.getValueAt(x, 0)) {
						db++; jel = x;
					}
				}
				if(db == 0) {
					c.SM("Nincs kijelölve a módosítandó rekord!", 0);
				}
				if(db > 1) {
					c.SM("Több rekord van kijelölve!\nEgyszerre csak egy rekord módosítható", 0);
				}
				if(db == 1) {
					if(modDataPc() > 0) {
						boolean ok = true;
						if(ok && c.filled(textKredit)) {
							ok = c.goodInt(textKredit, "Kredit");
						}
						if(ok && c.filled(textJegy)) {
							ok = c.goodInt(textJegy, "Jegy");
						}
						if(ok) {
							Megerosito me = new Megerosito(SatlagSz.this, "Biztos módosítani akarod?");
							me.setVisible(true);
							if(me.erosit) {
								if(c.filled(textNev)) {
									tabKez.setValueAt(c.RTF(textNev), jel, 1);
								}
								if(c.filled(textKredit)) {
									tabKez.setValueAt(c.stringToInt(c.RTF(textKredit)), jel, 2);
								}
								if(c.filled(textJegy)) {
									tabKez.setValueAt(c.stringToInt(c.RTF(textJegy)), jel, 3);
								}
								FileManager.sAtlagInsert(tabKez, "Data\\eredmenyek.csv");
								c.SM("A rekord módosítva!", 1);
								reset(jel);
							}
							else {
								reset(jel);
							}
						}
					}else {
						c.SM("Nincs kitöltve módosító adatmezõ vagy nem jól!", 0);
					}
				}
			}
		});
		KezeloPanel.add(btnMdost);
		
		JButton btnTorol = new JButton("T\u00F6r\u00F6l");
		btnTorol.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				int db = 0, jel = 0, x = 0;
				for(x = 0; x < tabKez.getRowCount(); x++) {
					if((Boolean)tabKez.getValueAt(x, 0)) {
						db++; jel = x;
					}
				}
				if(db == 0) {
					c.SM("Nincs kijelölve a törlendõ rekord!", 0);
				}
				if(db > 1) {
					c.SM("Több rekord van kijelölve!\nEgyszerre csak egy rekord törölhetõ", 0);
				}
				if(db == 1) {
					Megerosito me = new Megerosito(SatlagSz.this, "Biztos törölni akarja?");
					me.setVisible(true);
					if(me.erosit) {
						tabKez.removeRow(jel);
						FileManager.sAtlagInsert(tabKez, "Data\\eredmenyek.csv");
						c.SM("A rekord törölve!", 1);
					}
					else {
						reset(jel);
					}
				}
			}
		});
		KezeloPanel.add(btnTorol);
		
		JButton btnJoslas = new JButton("Jóslás");
		btnJoslas.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				alap.clear();
				Listfeltolto(alap);
				Joslas csl = new Joslas(SatlagSz.this, alap);
				dispose();
				csl.setVisible(true);
			}
		});
		EgyebmenuPanel.add(btnJoslas);
		
		JButton btnMenu = new JButton("Menu");
		btnMenu.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Menu menu = new Menu();
				dispose();
				menu.setVisible(true);
			}
		});
		EgyebmenuPanel.add(btnMenu);
		
		
		
		
		
		
		
		

	}
	
	public String RTF(JTextField jtf) {
		return jtf.getText();
	}
	
	public void reset(int i) {
		textNev.setText("");
		textKredit.setText("");
		textJegy.setText("");
		tabKez.setValueAt(false, i, 0);
	}
	
	public int modDataPc() {
		int pc = 0;
		if(c.filled(textNev)) {
			pc++;
		}
		if(c.filled(textKredit)) {
			pc++;
		}
		if(c.filled(textJegy)) {
			pc++;
		}
		return pc;
	}
	
	public void Listfeltolto(ArrayList<Targyak> list) {
		for(int i = 0; i < tabKez.getRowCount(); i++) {
			list.add(new Targyak(""+tabKez.getValueAt(i, 1), Integer.parseInt(tabKez.getValueAt(i, 2).toString()), Integer.parseInt(tabKez.getValueAt(i, 3).toString())));
		}
	}
	
	public void  Szamitas() {
		int sum = 0, ksum = 0;
		for(int i = 0; i < alap.size(); i++) {
			sum = sum + (alap.get(i).getJegy() * alap.get(i).getKredit());
			ksum = ksum + alap.get(i).getKredit();
		}
		atlag = (double)sum/ksum;
	}
}
