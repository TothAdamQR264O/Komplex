package Oraren;

import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import java.awt.BorderLayout;
import javax.swing.JLabel;
import java.awt.Font;
import javax.swing.JTextField;
import java.awt.GridLayout;
import javax.swing.JButton;
import java.awt.event.ActionListener;
import java.text.ParseException;
import java.awt.event.ActionEvent;
import javax.swing.JComboBox;
import Program.*;

public class OrarendEditor extends JFrame {

	private JPanel contentPane;
	private JTextField textTargyNev;
	private JTextField textEloadoNev;
	private JTextField textHely;
	private String selectedHettipus = "V�lasszd ki a h�t tipus�t!";
	private String selectedHet = "V�lasszd ki a hetet!";
	private String selectedIdo = "V�lasszd ki az id�pontot!";
	private Ellenorzo c = new Ellenorzo();
	private Het[] Ahet = new Het[11];
	private Het[] Bhet = new Het[11];
	private String hely = "-";
	private String eloado = "-";
	private int ido = -1;
	
	public OrarendEditor(Het[] ahet, Het[] bhet, int ht) {
		super("MU TCM: �rarend szerkeszt�");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 800, 500);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setExtendedState(JFrame.MAXIMIZED_BOTH);
		Ahet = ahet;
		Bhet = bhet;
		
		setContentPane(contentPane);
		contentPane.setLayout(new BorderLayout(0, 0));
		
		JPanel KozepsoPanel = new JPanel();
		contentPane.add(KozepsoPanel, BorderLayout.CENTER);
		KozepsoPanel.setLayout(new GridLayout(0, 1, 0, 0));
		
		JLabel lblTargyNeve = new JLabel("T�rgy neve");
		lblTargyNeve.setFont(new Font("Tahoma", Font.PLAIN, 17));
		KozepsoPanel.add(lblTargyNeve);
		
		textTargyNev = new JTextField();
		KozepsoPanel.add(textTargyNev);
		textTargyNev.setColumns(10);
		
		
		
		JLabel lblEloadoNeve = new JLabel("El�ad� neve");
		lblEloadoNeve.setFont(new Font("Tahoma", Font.PLAIN, 17));
		KozepsoPanel.add(lblEloadoNeve);
		
		textEloadoNev = new JTextField();
		textEloadoNev.setColumns(10);
		KozepsoPanel.add(textEloadoNev);
		
		JLabel lblEloadasHelye = new JLabel("El�ad�s helye");
		lblEloadasHelye.setFont(new Font("Tahoma", Font.PLAIN, 17));
		KozepsoPanel.add(lblEloadasHelye);
		
		textHely = new JTextField();
		textHely.setColumns(10);
		KozepsoPanel.add(textHely);
		
		JPanel AlsoPanel = new JPanel();
		contentPane.add(AlsoPanel, BorderLayout.SOUTH);
		
		JButton btnMentes = new JButton("Ment�s");
		btnMentes.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Boolean OK = true;
				int tombszam = -1;
				if(selectedHettipus.contentEquals("V�lasszd ki a h�t tipus�t!")) {
					c.SM("A kijel�lt elem nem valaszthat�", 0);
					OK = false;
				}
				if(selectedHet.contentEquals("V�lasszd ki a hetet!")) {
					c.SM("A kijel�lt elem nem valaszthat�", 0);
					OK = false;
				}
				if(selectedIdo.contentEquals("V�lasszd ki az id�pontot!")) {
					c.SM("A kijel�lt elem nem valaszthat�", 0);
					OK = false;
				}else {
					ido = Integer.parseInt(selectedIdo.substring(0));
					tombszam = ido-8;
				}
				if(OK) {
					if(c.filled(textTargyNev)) {
						if(c.filled(textHely)) {
							hely = c.RTF(textHely);
						}
						if(c.filled(textEloadoNev)) {
							eloado = c.RTF(textEloadoNev);
						}
						if(selectedHettipus.substring(0).equals("A")) {
							if(selectedHet.substring(0).equals("H�tf�")) {
								Ahet[tombszam].setHetfo(c.RTF(textTargyNev), eloado, hely);
							}else if(selectedHet.substring(0).equals("Kedd")) {
								Ahet[tombszam].setKedd(c.RTF(textTargyNev), eloado, hely);
							}else if(selectedHet.substring(0).equals("Szerda")) {
								Ahet[tombszam].setSzerda(c.RTF(textTargyNev), eloado, hely);
							}else if(selectedHet.substring(0).equals("Cs�t�rt�k")) {
								Ahet[tombszam].setCsutortok(c.RTF(textTargyNev), eloado, hely);
							}else if(selectedHet.substring(0).equals("P�ntek")) {
								Ahet[tombszam].setPentek(c.RTF(textTargyNev), eloado, hely);
							}
							FileManager.orarendKiir("Data\\Ahet.txt", Ahet);
							Timetable orarend = new Timetable(ht);
							dispose();
							orarend.setVisible(true);
						}else if(selectedHettipus.substring(0).equals("B")) {
							if(selectedHet.substring(0).equals("H�tf�")) {
								Bhet[tombszam].setHetfo(c.RTF(textTargyNev), eloado, hely);
							}else if(selectedHet.substring(0).equals("Kedd")) {
								Bhet[tombszam].setKedd(c.RTF(textTargyNev), eloado, hely);
							}else if(selectedHet.substring(0).equals("Szerda")) {
								Bhet[tombszam].setSzerda(c.RTF(textTargyNev), eloado, hely);
							}else if(selectedHet.substring(0).equals("Cs�t�rt�k")) {
								Bhet[tombszam].setCsutortok(c.RTF(textTargyNev), eloado, hely);
							}else if(selectedHet.substring(0).equals("P�ntek")) {
								Bhet[tombszam].setPentek(c.RTF(textTargyNev), eloado, hely);
							}
							FileManager.orarendKiir("Data\\Bhet.txt", Bhet);
							Timetable orarend = new Timetable(ht);
							dispose();
							orarend.setVisible(true);
						}
					}
				}
			}
		});
		AlsoPanel.add(btnMentes);
		
		JButton btnVissza = new JButton("Vissza");
		btnVissza.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Timetable orarend = new Timetable(ht);
				dispose();
				orarend.setVisible(true);
			}
		});
		AlsoPanel.add(btnVissza);
		
		
		JPanel BalPanel = new JPanel();
		contentPane.add(BalPanel, BorderLayout.WEST);
		BalPanel.setLayout(new GridLayout(0, 1, 0, 0));
		
		JLabel lblHettipus = new JLabel("H�t tipusa");
		BalPanel.add(lblHettipus);
		
		JComboBox HettipusBox = new JComboBox();
		HettipusBox.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				selectedHettipus = HettipusBox.getSelectedItem().toString();
			}
		});
		HettipusBox.addItem("V�lasszd ki a h�t tipus�t!");
		HettipusBox.addItem("A");
		HettipusBox.addItem("B");
		BalPanel.add(HettipusBox);
		
		JLabel lblHet = new JLabel("H�t");
		BalPanel.add(lblHet);
		
		JComboBox HetBox = new JComboBox();
		HetBox.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				selectedHet = HetBox.getSelectedItem().toString();
			}
		});
		HetBox.addItem("V�lasszd ki a hetet!");
		HetBox.addItem("H�tf�");
		HetBox.addItem("Kedd");
		HetBox.addItem("Szerda");
		HetBox.addItem("Cs�t�rt�k");
		HetBox.addItem("P�ntek");
		BalPanel.add(HetBox);
		
		JLabel lblIdo = new JLabel("Id�");
		BalPanel.add(lblIdo);
		
		JComboBox IdoBox = new JComboBox();
		IdoBox.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				selectedIdo = IdoBox.getSelectedItem().toString();
			}
		});
		IdoBox.addItem("V�lasszd ki az id�pontot!");
		IdoBox.addItem("8");
		IdoBox.addItem("9");
		IdoBox.addItem("10");
		IdoBox.addItem("11");
		IdoBox.addItem("12");
		IdoBox.addItem("13");
		IdoBox.addItem("14");
		IdoBox.addItem("15");
		IdoBox.addItem("16");
		IdoBox.addItem("17");
		IdoBox.addItem("18");
		BalPanel.add(IdoBox);
	}
}
